#!/usr/bin/env python3

from datetime import datetime, timedelta
from email.utils import formatdate
from time import mktime
import os.path
from urllib3.util import parse_url

from bottle import error, redirect, request, response, route, run, template

dir = os.path.dirname(os.path.realpath(__file__))
filename = os.path.join(dir, 'dot_clear.png')
with open(filename, 'rb') as px:
    buf = px.read()

def format_headers(h):
    return '\n'.join(['%s: %s' % (k, v) for (k, v) in h.items()])

@error(404)
@route('/')
@route('/<path_domain>/')
@route('/<path_domain>')
def pixel(path_domain=""):
    seen = {}
    sites = request.cookies.site
    sites = sites.replace('"', '')
    for c in sites.split(' '):
        if '.' in c:
            seen[c] = True

    ref_domain = parse_url(request.get_header('Referer')).host
    req_domain = parse_url(request.url).host

    if ref_domain and ref_domain != req_domain:
        seen[ref_domain] = True

    try:
        del(seen['ad.aloodo.com'])
    except KeyError:
        pass

    cdata = ' '.join(seen.keys())
    if cdata:
        response.set_header('Set-Cookie',
            'site="%s"; Max-Age=31536000; Path=/' % cdata)

    response.status=200
    response.set_header('Tk', 'D')
   
    accept = request.get_header('Accept')
    if not "image" in accept and "text/html" in accept:
        response.set_header('Content-Type', 'text/html')
        return template('info',
            req_headers=format_headers(request.headers),
            res_headers=format_headers(response.headers),
            req_url=request.url)
    else:
        response.set_header('Content-Type', 'image/png')
        if len(seen) >= 3 or path_domain == ref_domain:
            expdt = datetime.now() + timedelta(days=7)
            exp = mktime(expdt.timetuple())
            response.set_header('Expires', formatdate(
                timeval=exp, localtime=False, usegmt=True))
        return buf

if __name__ == '__main__':
    run(host='localhost', port=8000, reloader=True)

