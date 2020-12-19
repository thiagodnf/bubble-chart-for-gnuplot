export default `
@OUTPUT@

set xrange [@X_RANGE@]
set yrange [@Y_RANGE@]

set xtics (@X_TICS@)
set ytics (@Y_TICS@)

scale = @SCALE@

@Y_AXIS@

set bmargin @B_MARGIN@

set xtics rotate by @ROTATE@ offset 0,0

circleColor = '@CIRCLE_COLOR@'
textColor = '@TEXT_COLOR@'

set grid
set tics scale 0

unset key

set multiplot layout 1,1

plot '-' using 1:2:($3*scale) with circles lt rgb circleColor fs solid border rgb circleColor fs transparent solid 0.5, \
'-' using 1:2:(sprintf("%d",$3)) with labels notitle  textcolor rgb textColor
@DATA_CIRCLE@
EOF
@DATA_TEXT@
EOF
`;
