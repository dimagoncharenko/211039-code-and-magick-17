'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var fileChooser = document.querySelector('.upload input[type="file"]');
  var preview = document.querySelector('.setup-user-pic');
  var setupIcon = document.querySelector('.setup-open-icon');

  fileChooser.addEventListener('change', function () {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (type) {
      return fileName.endsWith(type);
    });

    if (matches) {
      var reader = new FileReader();
      reader.readAsDataURL(file);

      reader.addEventListener('load', function () {
        preview.src = reader.result;
        setupIcon.src = reader.result;
      });
    }
  });

})();
