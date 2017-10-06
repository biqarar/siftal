// on start
route('*', function ()
{

}).once(function()
{
  amChartRunner();
});



function amChartRunner()
{
  $('.chart:not([data-draw])').each(function()
  {
    // declare variables
    var $this    = $(this);
    var attrId   = $this.attr('id');
    var attrVals = $this.attr('data-vals');

    // generate values
    if(attrVals)
    {
      attrVals = JSON.parse(attrVals);
      // reverse order
      if($('html').attr('lang') === 'fa')
      {
        attrVals.reverse();
      }
    }
    else
    {
      attrVals = [];
    }

    // define with default value
    var chartOpt =
    {
      type: "serial",
      theme: "light",
      dataProvider: attrVals,
      startDuration: 0.5,
      startEffect: "easeOutSine",
      graphs:
      [{
        // "balloonText": "<b>[[category]]: [[value]]</b>",
        "fillAlphas": 0.6,
        "lineAlpha": 0,
        "type": "column",
        "valueField": "value",
        "balloonFunction": function(item)
        {
          return fitNumber(item.category, false) + " <b>" + fitNumber(item.values.value) + "</b>";
        },


        "colorField": "color",
        "lineColorField": "color",
        "customBulletField": "bullet",
        "bulletSize": 40,

      }],
      chartCursor:
      {
        "categoryBalloonEnabled": false,
        "cursorAlpha": 0.03,
        "zoomable": false,
        "fullWidth": true,
      },

      categoryField: "key",
      categoryAxis: generateCategoryAxis({"data": attrVals}, $this),
      valueAxes: generateValueAxes({"data": attrVals}, $this),
    };

    // set type of chart
    if(chartType = $this.attr('data-type'))
    {
      switch(chartType)
      {
        case "area":
          chartOpt.graphs[0].type = 'line';
          break;

        case "line":
          chartOpt.graphs[0].type = 'line';
          chartOpt.graphs[0].bullet                      = "round";
          chartOpt.graphs[0].lineThickness               = 3;
          chartOpt.graphs[0].bulletSize                  = 7;
          chartOpt.graphs[0].bulletBorderAlpha           = 1;
          chartOpt.graphs[0].bulletColor                 = "#FFFFFF";
          chartOpt.graphs[0].useLineColorForBulletBorder = true;
          chartOpt.graphs[0].bulletBorderThickness       = 3;
          chartOpt.graphs[0].fillAlphas                  = 0;
          chartOpt.graphs[0].lineAlpha                   = 1;
          break;

        // show column chart as default
        case "default":
          break;
      }
    }

    // set category field
    if($this.attr('data-categoryField'))
    {
      chartOpt.categoryField = $this.attr('data-categoryField')
    }


    // before draw if need special format, call funtion and pass option
    if(attrId && typeof window['format_' + attrId] == 'function')
    {
      chartOpt = window['format_' + attrId]($this, chartOpt, attrVals);
    }

    // draw chart with option on container
    var chartData = AmCharts.makeChart(this, chartOpt);
    // save for future use
    $this.data('chart', chartData);
    $this.attr('data-draw', true);
  });
}



function generateCategoryAxis(_arg, _this)
{
  prop =
  {
    "gridPosition": "start",
    "gridAlpha": 0,
    "tickPosition": "start",
    "twoLineMode": true,
    "tickLength": 5,
    "axisAlpha": 0.2,
    "gridPosition": "start",
    "autoWrap":false,
    "minHorizontalGap":0,
    // "autoWrap":false,
    // "labelRotation": 45,

    // "autoRotateCount": 6,
    // "autoRotateAngle": 45,
    "autoWrap": true,

    "labelFunction": function(value)
    {
      return fitNumber(value, false) ;
    },
  };

  var maxSize = _this.width() / _arg.data.length;

  if(maxSize < 45)
  {
    prop.autoWrap = false;
    prop.autoRotateCount = 0;
    prop.autoRotateAngle = 90;
  }
  else if(maxSize < 65)
  {
    prop.autoWrap = false;
    prop.autoRotateCount = 4;
    prop.autoRotateAngle = 75;
  }
  else if(maxSize < 80)
  {
    prop.autoWrap = false;
    prop.autoRotateCount = 5;
    prop.autoRotateAngle = 60;
  }

  return prop;
}


function generateValueAxes(_arg, _this)
{
  prop =
  [
    {
      "stackType": "regular",
      "axisAlpha": 0.1,
      "gridAlpha": 0.05,
      "minimum": 0,
      "integersOnly": true,
      // "position" : "right",
      "labelFunction": function(value)
      {
        return fitNumber(value, false);
      },
    }
  ];

  if($('html').attr('dir') === 'rtl')
  {
    prop[0].position = 'right';
  }
  return prop;
}



