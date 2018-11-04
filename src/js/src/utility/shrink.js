

$.fn.shrink = function(_maxFontSize)
{
  _maxFontSize = parseInt(_maxFontSize, 10);
  return this.each(function()
  {
    var ourText = $("span", this);
    var parent = ourText.parent();
    var maxHeight = parent.height();
    var maxWidth = parent.width() - 20;
    var fontSize = parseInt(ourText.css("fontSize"), 10);
      //var multiplier = maxWidth/(ourText.width()-15);
    var multiplier = maxWidth/ourText.width();
    var newSize = (fontSize*(multiplier-0.1));

    ourText.css("fontSize", (_maxFontSize > 0 && newSize > _maxFontSize) ? _maxFontSize : newSize);
  });
};

