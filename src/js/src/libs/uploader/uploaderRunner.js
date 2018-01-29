function bindUploader()
{
  $('#gallery').uploader({
    url: window.location.href,
    dataType: 'json',

    // Note: The GET is for test as POST request is not allowed on Github Pages.
    method: 'POST',
    dropzone: '.dropzone',

    done: function (e, data)
    {
      // console.log(e.type); // 'done'
      // console.log(e.namespace); // 'uploader'
      // console.log(data); // Response data
      // $logs.append(p('* File ' + (e.index + 1) + ' result done: ' + data.result));
    },


    // upload: function (e) {
    //   $logs.empty().append(p('All files uploading'));
    // },

    // start: function (e) {
    //   $logs.append(p('* File ' + (e.index + 1) + ' uploading'));
    // },

    // progress: function (e) {
    //   $logs.append(p('* File ' + (e.index + 1) + ' uploaded: ' + Math.round(e.loaded / e.total * 100) + '%'));
    // },

    // fail: function (e, textStatus) {
    //   $logs.append(p('* File ' + (e.index + 1) + ' result fail: ' + textStatus));
    // },

    // end: function (e) {
    //   $logs.append(p('* File ' + (e.index + 1) + ' completed'));
    // },

    uploaded: function (e) {
      console.log('All files uploaded');
      Navigate({url: window.location.href});
    }
  });
}


