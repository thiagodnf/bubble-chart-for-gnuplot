![alt tag](https://raw.githubusercontent.com/thiagodnf/bubble-chart-for-gnuplot/master/img/favicon/android-icon-72x72.png)
# Bubble Chart for Gnuplot

This tool generates a script that plots a bubble chart in the gnuplot tool

## How to use

You need to enter labels separated by ";". Further informations, use the "example" option on app. Generate the script and run following command on terminal:

```text
$ gnuplot script.gnu
```

Next, you can see some examples of generated results.

#### One Information

The following code generates a chart with one Information:

```text
Red;Circle;10
White;Triangle;4
Red;Triangle;8
Green;Ellipse;1
Blue;Rectangle;15
```

The result is:

![alt tag](https://raw.githubusercontent.com/thiagodnf/bubble-chart-for-gnuplot/master/img/example_1.png)

#### Two Informations

Separate the informations using the "#" character. The following code generates a chart with two Informations:

```text
Red;Circle;10
White;Triangle;4
Red;Triangle;8
Green;Ellipse;1
Blue;Rectangle;15
#
Gold;Circle;6
Silver;Rectangle;2
Silver;Triangle;7
Iron;Triangle;9
Titanium;Rectangle;1
```

The result is:

![alt tag](https://raw.githubusercontent.com/thiagodnf/bubble-chart-for-gnuplot/master/img/eample%20_2.png)

## Questions

* How can I increase the circle size? Use the SCALE option to increase or decrease the circle size.

## License

Released under the terms of MIT License.

## Contact

If you encounter any problems, please use the [GitHub Issue Tracker](https://github.com/thiagodnf/bubble-chart-for-gnuplot/issues) .

If you like this projet, let me know.
