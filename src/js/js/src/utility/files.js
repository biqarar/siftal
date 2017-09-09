
/**
 * show preview of input file if its posible
 * @return {[type]} [description]
 */
function runInputFileFunc()
{
  $('input[type="file"]').on('change', function()
  {
    var $this    = $(this);
    var $fileBox = $this.parents('.input');
    var myFile   = this.files[0];
    // user not select file, cancel choosing file
    if(!myFile)
    {
      // clear old file and remove preview and some other if needed
      $this.attr('data-size', null);
      return false;
    }

    // get selected file size
    var fileSize = Math.round( myFile.size / 1024);
    $this.attr('data-size', fileSize);


    // check for min file size
    if($this.attr('data-min'))
    {
      // if size is less than needed size
      if(fileSize < $this.attr('data-min'))
      {
        $fileBox.addClass('error');
        $fileBox.removeClass('ok');
      }
      else
      {
        $fileBox.addClass('ok');
        $fileBox.removeClass('error');
      }
    }
    // check for max file size
    if($this.attr('data-max'))
    {
      // if size is less than needed size
      if(fileSize > $this.attr('data-max'))
      {
        $fileBox.addClass('error');
        $fileBox.removeClass('ok');
      }
      else
      {
        $fileBox.addClass('ok');
        $fileBox.removeClass('error');
      }
    }

    if($fileBox.attr('data-crop'))
    {
      var $modal = $('#' + $fileBox.attr('data-crop'));
      $modal.trigger('open', $fileBox);
      //
      $('[data-ok]').on('click', function()
      {
          var $crop            = $this.parents('.cropper');
          var cropObj          = $crop.data('cropObj');
          var $croppedInput    = $crop.find('.input.preview');
          console.log($croppedInput);
          var $croppedInputEl  = $croppedInput.find('input[type=file]');
          console.log($croppedInputEl);
          // var $croppedInputImg = $croppedInput.find('img');



          // create a canvas from selected area
          canvasImg = cropObj.getCroppedCanvas();
          // console.log(cropObj);
          // console.log(canvasImg);
          if(!canvasImg)
          {
            console.log('has error! not found!');
            return false;
          }

          canvasImg.toBlob(function(_blob)
          {
           // create url for new blob
           myUrl = URL.createObjectURL(_blob);
           // $croppedInputEl.val(myUrl);

           console.log(myUrl);
           console.log($croppedInput);
           // set url for src of img
           // _preview.attr('src', myUrl);
          });

      });
      // clear all history!
      $('[data-cancel]').on('click', function()
      {

      });
    }

    // if have preview start creating preview
    if($this.attr('data-preview') !== undefined)
    {
      if(fileSize > 1024)
      {
        $fileBox.addClass('error');
        $fileBox.removeClass('ok');
        $fileBox.removeClass('warning');
        return false;
      }
      else
      {
        $fileBox.removeClass('error');
      }
        $fileBox.removeClass('ok');
        $fileBox.removeClass('warning');

      var myLabel   = $this.parent().find('label');
      var myImgPrev = myLabel.find('img');
      var myImgSrc  = null;

      if(myImgPrev.length < 1)
      {
        // create img element and replace it in html
        var myImg = document.createElement("img");
        myImg.id  = $this.attr('id') + 'Preview';
        myLabel.html(myImg);
        // get new inserted img
        myImgPrev = myLabel.find('img');
      }

      // get image path and ext
      var imgPath = $this[0].value;
      var imgExt  = imgPath.substring(imgPath.lastIndexOf('.') + 1).toLowerCase();
      // if selected valid extention for preview
      if (imgExt == "gif" || imgExt == "png" || imgExt == "jpg" || imgExt == "jpeg")
      {
        // if file reader is defined!
        if (typeof (FileReader) != "undefined")
        {
          // create new reader
          var reader = new FileReader();

          reader.onload = function (e)
          {
            // get loaded data and render thumbnail.
            myImgPrev.attr('src', e.target.result);
          };

          // read the image file as a data URL.
          reader.readAsDataURL(myFile);
          myImgSrc = true;
          $fileBox.addClass('ok');
        }
        else
        {
          console.log('file reader is undefined!');
          var blobURL = window.URL.createObjectURL(myFile);
          myImgPrev.attr('src', blobURL);
          myImgSrc = true;
          $fileBox.addClass('warning');
        }
      }
      else
      {
        console.log('we cant preview this type of file');
        myImgPrev.attr('src', null);
        $fileBox.addClass('warning');
      }
    }
  });


}


function showImgPreview()
{

}

