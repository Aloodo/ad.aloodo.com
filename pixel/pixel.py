#!/usr/bin/env python3

import os.path
from urllib3.util import parse_url

from bottle import request, response, route, run

dir = os.path.dirname(os.path.realpath(__file__))
filename = os.path.join(dir, 'dot_clear.png')
with open(filename, 'rb') as px:
    buf = px.read()

@route('/')
def pixel():
    seen = {}
    for c in request.cookies.site.split(' '):
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
        response.set_cookie('site', cdata, max_age=31536000 + rng.randint(0, 2592000))

    #FIXME: construct shorter expires header (within cookie expiration)
    if len(seen) >= 3:
        response.set_header('Expires', "Mon, 01 Sep 2036 12:24:38 GMT")

    response.status=200
    response.set_header('Content-Type', 'image/png')
    response.set_header('Tk', 'D')
    return buf

@route('/a/')
def pg():
    return '''
    <html><body><img src="/"></body></html>
    '''

if __name__ == '__main__':
    run(host='localhost', port=8080, reloader=True)

