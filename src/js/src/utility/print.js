

function autoPrint()
{
    printTimeout = setTimeout(function()
    {
      if (window.location.href.indexOf("print=auto") > -1)
      {
        window.print();
        logy('open print...');
      }

    }, 50);
}

