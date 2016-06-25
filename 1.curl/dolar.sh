#!/bin/bash
clear 
USERAGENT="Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.85 Safari/537.36"

API_DOLAR="http://api.promasters.net.br/cotacao/v1/valores?moedas=USD&alt=xml"
RES_DOLAR=$(curl -s -A "$USERAGENT" "$API_DOLAR")
DOLAR=$(echo "$RES_DOLAR" \
	| sed "s/<valor>/\n/g" \
	| sed "s/<\/valor>/\n/g" \
	| tail -n 2 \
	| head -n 1 \
	| cut -c 1-5)

URL_ASCI="http://www.bagill.com/ascii-sig.php"
RES_ASCI=$(curl -s -k \
	-d "txt=$DOLAR" -d "font=doh" \
	-d "width=100" -d "align=l" \
	-d "submit=Generate ASCII Signature" \
	-A $USERAGENT $URL_ASCI)

ASCI=$(echo "$RES_ASCI" | perl -wne 'print if /<pre style=/ .. /<\/pre>/')
echo "Dólar hoje: $DOLAR"
echo "$ASCI" | sed "s/<pre style='margin-bottom:0;'>//g" | sed "s/<\/pre>//g"
echo "entendeu?"
