
function cleaveRunner()
{
  $('input[data-format]').each(function()
  {
    var myFormat = $(this).attr('data-format');
    var opt = {};

    switch ($(this).attr('data-format'))
    {
      case "number":
        opt.numeral = true;
        opt.numeralPositiveOnly = true;
        break;

      case "int":
        opt.numeral = true;
        opt.numeralDecimalScale = 0;
        opt.numeralPositiveOnly = true;
        opt.numeralThousandsGroupStyle = 'none';
        break;

      case "price":
        opt.numeral = true;
        opt.numeralPositiveOnly = true;
        break;

      case "price-int":
        opt.numeral = true;
        opt.numeralDecimalScale = 0;
        opt.numeralPositiveOnly = true;
        break;

      case "date":
        opt.numericOnly = true;
        opt.blocks = [4, 2, 2];
        opt.delimiters = ["/", "/"];
        break;

      case "time":
        opt.time = true;
        opt.timePattern = ['h', 'm'];
        break;

      case "creditCard":
        opt.creditCard = true;
        break;

      case "postalCode":
        opt.numericOnly = true;
        opt.blocks = [5, 5];
        opt.delimiter = "-";
        break;

      case "nationalCode":
        opt.numericOnly = true;
        opt.blocks = [3, 6, 1];
        opt.delimiter = "-";
        opt.delimiterLazyShow = true;
        break;

      case "vat":
        opt.numericOnly = true;
        opt.blocks = [5, 3, 4];
        opt.delimiter = ".";
        opt.delimiterLazyShow = true;
        break;


      case "tel":
        opt.numericOnly = true;
        // opt.prefix = '00',
        opt.blocks = [4, 2, 4, 4];
        opt.delimiterLazyShow = true;
        break;

      case "mobile-enter":
        opt.numeral = true;
        opt.numeralDecimalScale = 0;
        opt.numeralPositiveOnly = true;
        opt.numeralThousandsGroupStyle = 'none';
        break;

      case "phone-12":
        opt.numericOnly = true;
        opt.blocks = [0, 3, 0, 4, 4];
        opt.delimiters = ["(", ")", " ", "-"];
        break;

      case "phone-14":
        opt.numericOnly = true;
        opt.blocks = [0, 2, 0, 3, 0, 3, 4];
        opt.delimiters = ["+", " ", "(", ")", " ", "-"];
        break;

      case "phone-ir":
        opt.phone = true;
        opt.phoneRegionCode = 'IR';
        break;

      case "phone-us":
        opt.phone = true;
        opt.phoneRegionCode = 'IR';
        break;

      case "phone-country":
        if($('#country').val())
        {
          opt.phone = true;
          opt.phoneRegionCode = $('#country').val();
        }
        break;

      default:
        opt.numeral = true;
        break;
    }

    new Cleave($(this), opt);
  });

}
