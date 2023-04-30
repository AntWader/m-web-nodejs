#!/bin/sh
find /home/antwader/cron/croncheck -type f -mmin +3 -not -name "*.tar.gz" -exec tar -czvf "{}.tar.gz" /home/antwader/cron/croncheck \;