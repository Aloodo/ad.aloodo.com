#!/usr/bin/env python3

#FIXME remove unneeded
from bottle import HTTPError, request, response, route, run

#FIXME get the path right
with open('dot_clear.png', 'rb') as px:
    buf = px.read()

@route('/')
def pixel():
    seen = {}
    for c in request.cookies.site.split(' '):
        seen[c] = True
    ref_domain = 'yo.example.com' #FIXME real referer
    seen[ref_domain] = True
    cdata = ' '.join(seen.keys())

    response.set_cookie('site', cdata, max_age=31536000)
    response.status=200
    response.set_header('Content-Type', 'image/png')
    return buf


if __name__ == '__main__':
    run(host='localhost', port=8080, reloader=True)

