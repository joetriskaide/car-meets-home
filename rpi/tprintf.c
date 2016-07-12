#include <stdio.h>
#include <stdarg.h>
#include <time.h>
#include "tprintf.h"
int tprintf(char *fmt, ...) {
    char buf[200];
    time_t t;
    struct tm *now;
    va_list ap;

    t = time(NULL);
    now = localtime(&t);
    strftime(buf, sizeof(buf), "%Y-%m-%d %H:%M:%S", now);
    fprintf(stderr, "[%s] ", buf);
    va_start(ap, fmt);
    vfprintf(stderr, fmt, ap);
    va_end(ap);

}

