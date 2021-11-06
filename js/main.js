var valid_name = valid_surname = valid_otch = valid_date = valid_snils = valid_city = false;
var phone = $('.phone'),
    mask_phone = phone.data('mask'),
    number = $('.number'),
    mask_number = number.data('mask'),
    series = $('.series'),
    mask_series = series.data('mask'),
    kod = $('.kod'),
    mask_kod = kod.data('mask'),
    snils = $('.snils'),
    mask_snils = snils.data('mask');

$.mask.definitions['h'] = "[+]";
phone.mask(mask_phone);
number.mask(mask_number);
series.mask(mask_series);
kod.mask(mask_kod);
snils.mask(mask_snils, {
  completed:function() {
    valid_snils = true;
  }
});

$('body').on('focus', 'input', function() {
  $(this).parents('.form-group').addClass('is-focus');
})
$('body').on('blur', 'input', function() {
  $(this).parents('.form-group').removeClass('is-focus');
})

// validation
$('body').on('click', '.first', function() {
  var surname = $('#surname'),
      name = $('#name'),
      otch = $('#otch'),
      date = $('#date'),
      snils = $('#snils'),
      city = $('#city');

  function clearAll() {
    clearInterval(interval);

    var interval = setInterval(function () {
      form = $('form');
      form.find('.form-group').removeClass('has-error');
      clearInterval(interval);
    }, 5000);
  }

  // Фамиилия
  if ((surname.val().length === 0) || (/[-]$/ig).test(surname.val())) {
    surname.parent().find('.error-block').html('Напишите свою фамилию');
    surname.parents('.form-group').addClass('has-error');
    clearAll();
  } else if (!(/[а-я\- ]{2,20}$/ig).test(surname.val())) {
    surname.parent().find('.error-block').html('Используйте кириллицу');
    surname.parents('.form-group').addClass('has-error');
    clearAll();
  } else {
    valid_surname = true;
  }

  // Имя
  if ((name.val().length === 0) || (/[-]$/ig).test(name.val())) {
    name.parent().find('.error-block').html('Напишите свое имя');
    name.parents('.form-group').addClass('has-error');
    clearAll();
  } else if (!(/[а-я\- ]{2,20}$/ig).test(name.val())) {
    name.parent().find('.error-block').html('Используйте кириллицу');
    name.parents('.form-group').addClass('has-error');
    clearAll();
  } else {
    valid_name = true;
  }

  // Имя
  if ((otch.val().length === 0) || (/[-]$/ig).test(otch.val())) {
    otch.parent().find('.error-block').html('Напишите свое отчество');
    otch.parents('.form-group').addClass('has-error');
    clearAll();
  } else if (!(/[а-я\- ]{2,20}$/ig).test(otch.val())) {
    otch.parent().find('.error-block').html('Используйте кириллицу');
    otch.parents('.form-group').addClass('has-error');
    clearAll();
  } else {
    valid_otch = true;
  }

  // Дата
  if ((date.val().length < 10)) {
    date.parent().find('.error-block').html('Введите дату рождения');
    date.parents('.form-group').addClass('has-error');
    clearAll();
  } else if (!(/^[0-9]{4}[-]{1}[0-9]{2}[-]{1}[0-9]{2}$/).test(date.val())) {
    date.parent().find('.error-block').html('Некорректная дата');
    date.parents('.form-group').addClass('has-error');
    clearAll();
  } else {
    valid_date = true;
  }

  // Снилс
  if (snils.val().length === 0) {
    snils.parent().find('.error-block').html('Введите СНИЛС');
    snils.parents('.form-group').addClass('has-error');
    clearAll();
  } else if (!valid_snils) {
    snils.parent().find('.error-block').html('Введите корректный номер');
    snils.parents('.form-group').addClass('has-error');
    clearAll();
  }
  // валидация сверху

  // Город
  if ((city.val().length === 0) || (/[-]$/ig).test(city.val())) {
    city.parent().find('.error-block').html('Введите город проживания');
    city.parents('.form-group').addClass('has-error');
    clearAll();
  } else if (!(/[а-я\- ]{2,40}$/ig).test(city.val())) {
    city.parent().find('.error-block').html('Используйте кириллицу');
    city.parents('.form-group').addClass('has-error');
    clearAll();
  } else {
    valid_city = true;
  }

  if (valid_name && valid_surname && valid_otch && valid_date && valid_snils && valid_city) {
    $('.form__steps li:nth-child(1)').addClass('completed');
    $('.form__steps li:nth-child(2)').addClass('active');

    $('.form__steps-container-in').css('transform', 'translateX(-25%)');
    $('.form__steps-container-in').attr('data-step', '2');

    setTimeout(function () {
      $('.btn').addClass('next').removeClass('first');
    }, 50);
  }
});

// next slide
$('body').on('click', '.next', function() {
  var slide 		= $('.form__steps-container-in').attr('data-step'),
      slideLeft = 100 / 4 * parseFloat(slide),
      nextSlide = parseFloat(slide) + 1;

  if (slide < 4) {
    $('.form__steps li:nth-child(' + slide + ')').addClass('completed');
    $('.form__steps li:nth-child(' + (parseFloat(slide) + 1) + ')').addClass('active');
    $('.form__steps-container-in').attr('data-step', nextSlide);
    $('.form__steps-container-in').css('transform', 'translateX(-' + slideLeft + '%)');
  } else if (slide == 4) {
    $('.footer1').addClass('is-hide');
    $('.footer2').removeClass('is-hide');
    $('.form__footer').addClass('form__footer-final');
    $('.next').addClass('orange');
    $('.form__footer-button').addClass('is-hide');
  } else {
    $('.form__steps li:nth-child(' + slide + ')').addClass('completed');
    $('.form').removeClass('active');

    setTimeout(function () {
      $('.form__success').addClass('active');
    }, 1000);
  }
})

$('body').on('change', '#check1', function() {
  var checked    = $(this).prop('checked'),
      disclaimer = $('.disclaimer');

  if (checked) {
    disclaimer.removeClass('active');
  } else {
    disclaimer.addClass('active');
  }
});
$('body').on('click', '#upgrade', function() {
  $('.disclaimer').removeClass('active');
  $('#check1').prop('checked', true);

  return false;
});

$('body').on('click', '#btn_final', function() {
  var checked   = $('#check2').prop('checked'),
      errorText = $('#check2').parent().find('label i');

  if (!checked) {
    errorText.css('display','block');

    clearInterval(interval);

    var interval = setInterval(function () {
      errorText.css('display','none');

      clearInterval(interval);
    }, 3000);
  } else {
    $('.form').removeClass('active');
    $('.form__success').addClass('active');
    $('.form__footer').css('display', 'none');
  }
})

$('body').on('click', '#check2', function() {
  var errorText = $('#check2').parent().find('label i');

  if ($(this).prop('checked')) {
    errorText.css('display','none');
  }
})

// popup
$('body').on('click', '.popup_open.rules', function() {
  var modal = $(this).attr('data-modal');

  $(modal).addClass('active');

  return false;
})

$('body').on('click', '.popup__close, .popup__bg', function () {
  $('.popup').removeClass('active');

  return false;
});
