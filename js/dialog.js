'use strict';

(function () {
  var WIZARD_NAMES = [
    'Иван',
    'Хуан Себастьян',
    'Мария',
    'Кристоф',
    'Виктор',
    'Ирвинг'
  ];

  var WIZARD_SURNAMES = [
    'да Марья',
    'Верон',
    'Мирабелла',
    'Вальц',
    'Онопко',
    'Топольницкая',
    'Нионго'
  ];

  var WIZARD_COAT_COLORS = [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'
  ];

  var WIZARD_EYES_COLORS = [
    'black',
    'red',
    'blue',
    'yellow',
    'green'
  ];

  var WIZARD_FIREBALL_COLORS = [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848'
  ];

  var COUNT_WIZARD = 4;

  var KEY_CODE = {
    ENTER: 13,
    ESC: 27
  };

  var userDialog = document.querySelector('.setup');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var similarContainer = userDialog.querySelector('.setup-similar');
  var similarWizardList = similarContainer.querySelector('.setup-similar-list');
  var fragment = document.createDocumentFragment();

  similarContainer.classList.remove('hidden');

  var getRandomNumber = function (min, max) {
    return Math.round(Math.random() * (max - min)) + min;
  };

  var getWizardFeatures = function (name, surname, coatColor, eyesColor) {
    var wizardFeature = {
      name: name + ' ' + surname,
      coatColor: coatColor,
      eyesColor: eyesColor
    };

    return wizardFeature;
  };

  var getArrayWizards = function (count) {
    var wizards = [];
    for (var i = 0; i < count; i++) {
      wizards.push(getWizardFeatures(WIZARD_NAMES[i], WIZARD_SURNAMES[i], WIZARD_COAT_COLORS[i], WIZARD_EYES_COLORS[i]));
    }

    return wizards;
  };

  var wizards = getArrayWizards(COUNT_WIZARD);

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
    fragment.appendChild(wizardElement);
  };

  for (var i = 0; i < COUNT_WIZARD; i++) {
    renderWizard(wizards[i]);
  }

  similarWizardList.appendChild(fragment);

  var setupOpen = document.querySelector('.setup-open');
  var setupClose = userDialog.querySelector('.setup-close');
  var setupUserName = userDialog.querySelector('.setup-user-name');

  var closePopup = function () {
    userDialog.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
    wizardCoat.removeEventListener('click', onWizardClick);
    wizardEyes.removeEventListener('click', onWizardClick);
    wizardFireball.removeEventListener('click', onWizardClick);
    userDialog.style.top = '';
    userDialog.style.left = '';
  };

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === KEY_CODE.ESC) {
      if (setupUserName !== document.activeElement) {
        closePopup();
      }
    }
  };

  var openPopup = function () {
    userDialog.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
    wizardCoat.addEventListener('click', onWizardClick);
    wizardEyes.addEventListener('click', onWizardClick);
    wizardFireball.addEventListener('click', onWizardClick);
  };

  setupOpen.addEventListener('click', openPopup);

  setupOpen.addEventListener('keydown', function (evt) {
    if (evt.keyCode === KEY_CODE.ENTER) {
      openPopup();
    }
  });

  setupClose.addEventListener('click', closePopup);

  setupClose.addEventListener('keydown', function (evt) {
    if (evt.keyCode === KEY_CODE.ENTER) {
      closePopup();
    }
  });

  var wizardCoat = userDialog.querySelector('.setup-wizard .wizard-coat');
  var inputCoatColor = userDialog.querySelector('input[name="coat-color"]');

  var wizardEyes = userDialog.querySelector('.setup-wizard .wizard-eyes');
  var inputEyesColor = userDialog.querySelector('input[name="eyes-color"]');

  var wizardFireball = userDialog.querySelector('.setup-fireball-wrap');
  var inputFireballColor = userDialog.querySelector('input[name="fireball-color"]');

  var onWizardClick = function (evt) {
    var target = evt.currentTarget;
    var randomValue;
    switch (target) {
      case wizardCoat:
        randomValue = WIZARD_COAT_COLORS[getRandomNumber(0, WIZARD_COAT_COLORS.length)];
        wizardCoat.style.fill = randomValue;
        inputCoatColor.value = randomValue;
        break;

      case wizardEyes:
        randomValue = WIZARD_EYES_COLORS[getRandomNumber(0, WIZARD_EYES_COLORS.length)];
        wizardEyes.style.fill = randomValue;
        inputEyesColor.value = randomValue;
        break;

      case wizardFireball:
        randomValue = WIZARD_FIREBALL_COLORS[getRandomNumber(0, WIZARD_FIREBALL_COLORS.length)];
        wizardFireball.style.backgroundColor = randomValue;
        inputFireballColor.value = randomValue;
        break;
    }
  };

  var dialogHandler = userDialog.querySelector('.upload');
  dialogHandler.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoord = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoord.x - moveEvt.clientX,
        y: startCoord.y - moveEvt.clientY
      };

      startCoord = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      userDialog.style.left = (userDialog.offsetLeft - shift.x) + 'px';
      userDialog.style.top = (userDialog.offsetTop - shift.y) + 'px';
    };

    var onMouseup = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseup);

      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          userDialog.removeEventListener('click', onClickPreventDefault);
        };

        userDialog.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseup);
  });

  var artifacts = userDialog.querySelectorAll('.setup-artifacts-shop .setup-artifacts-cell img');
  var artifactsBackpack = userDialog.querySelector('.setup-artifacts');
  var backpackCells = artifactsBackpack.querySelectorAll('.setup-artifacts .setup-artifacts-cell');

  artifacts.forEach(function (artifact) {

    var moveArtifact = function (evt) {
      evt.preventDefault();

      var startCoord = {
        x: evt.clientX,
        y: evt.clientY
      };

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        var shift = {
          x: startCoord.x - moveEvt.clientX,
          y: startCoord.y - moveEvt.clientY
        };

        startCoord = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        artifact.style.position = 'absolute';
        artifact.style.left = (artifact.offsetLeft - shift.x) + 'px';
        artifact.style.top = (artifact.offsetTop - shift.y) + 'px';

      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        var addElement = function () {
          for (var cell = 0; i < backpackCells.length; i++) {
            if (backpackCells[cell].children.length === 0) {
              backpackCells[cell].appendChild(artifact);
              artifact.style.position = 'static';
              artifact.style.left = '';
              artifact.style.top = '';
              artifact.classList.add('in-backpack');
              break;
            }
          }
          artifactsBackpack.removeEventListener('mouseover', addElement);
        };

        artifactsBackpack.addEventListener('mouseover', addElement);

        if (artifact.classList.contains('in-backpack')) {
          artifact.removeEventListener('mousedown', moveArtifact);
        } else {
          artifact.style.position = 'static';
          artifact.style.left = '';
          artifact.style.top = '';
        }

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mousemove', onMouseUp);
      };


      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    };

    artifact.addEventListener('mousedown', moveArtifact);
  });
})();

