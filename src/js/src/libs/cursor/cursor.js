
/**
 * [setSelectionRange description]
 * @param {[type]} _input          [description]
 * @param {[type]} _selectionStart [description]
 * @param {[type]} _selectionEnd   [description]
 */
function setSelectionRange(_input, _selectionStart, _selectionEnd)
{
  if (_input.setSelectionRange)
  {
    // this focus is js not jquery
    _input.focus();
    _input.setSelectionRange(_selectionStart, _selectionEnd);
  }
  else if (_input.createTextRange)
  {
    var range = _input.createTextRange();
    range.collapse(true);
    range.moveEnd('character', _selectionEnd);
    range.moveStart('character', _selectionStart);
    range.select();
  }
}


/**
 * [setCaretToPos description]
 * @param {[type]} _input [description]
 * @param {[type]} _pos   [description]
 */
function setCaretToPos(_input, _pos)
{
  setSelectionRange(_input, _pos, _pos);
}

