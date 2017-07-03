/**
 * Эффекты скорости
 */

var scaleDownAmnt = 0.7;
var boxShadowAmnt = '40px';


//Масштабирование вниз
$.Velocity.RegisterEffect("scaleDown", {
  defaultDuration: 1,
  calls: [
    [{
      opacity: '0',
      scale: '0.7',
 
    }, 1]
  ]
});

// Галлерея
$.Velocity.RegisterEffect("scaleDown.moveUp", {
  defaultDuration: 1,
  calls: [
    [{
      translateY: '0%',
      scale: scaleDownAmnt,
 
    }, 0.20],
    [{
      translateY: '-100%'
    }, 0.60],
    [{
      translateY: '-100%',
      scale: '1',
      // boxShadowBlur: '0'
    }, 0.20]
  ]
});
$.Velocity.RegisterEffect("scaleDown.moveUp.scroll", {
  defaultDuration: 1,
  calls: [
    [{
      translateY: '-100%',
      scale: scaleDownAmnt,
 
    }, 0.60],
    [{
      translateY: '-100%',
      scale: '1',
      // boxShadowBlur: '0'
    }, 0.40]
  ]
});
$.Velocity.RegisterEffect("scaleUp.moveUp", {
  defaultDuration: 1,
  calls: [
    [{
      translateY: '90%',
      scale: scaleDownAmnt,
      // boxShadowBlur: boxShadowAmnt     
    }, 0.20],
    [{
      translateY: '0%'
    }, 0.60],
    [{
      translateY: '0%',
      scale: '1',
      // boxShadowBlur: '0'
    }, 0.20]
  ]
});
$.Velocity.RegisterEffect("scaleUp.moveUp.scroll", {
  defaultDuration: 1,
  calls: [
    [{
      translateY: '0%',
      scale: scaleDownAmnt,
      // boxShadowBlur: boxShadowAmnt
    }, 0.60],
    [{
      translateY: '0%',
      scale: '1',
      // boxShadowBlur: '0'
    }, 0.40]
  ]
});
$.Velocity.RegisterEffect("scaleDown.moveDown", {
  defaultDuration: 1,
  calls: [
    [{
      translateY: '0%',
      scale: scaleDownAmnt,
      // boxShadowBlur: boxShadowAmnt
    }, 0.20],
    [{
      translateY: '100%'
    }, 0.60],
    [{
      translateY: '100%',
      scale: '1',
      // boxShadowBlur: '0'
    }, 0.20]
  ]
});
$.Velocity.RegisterEffect("scaleDown.moveDown.scroll", {
  defaultDuration: 1,
  calls: [
    [{

    }, 0.60],
    [{
      translateY: '100%',
      scale: '1',
      // boxShadowBlur: '0'
    }, 0.40]
  ]
});
$.Velocity.RegisterEffect("scaleUp.moveDown", {
  defaultDuration: 1,
  calls: [
    [{
      translateY: '-90%',
      scale: scaleDownAmnt,
      // boxShadowBlur: boxShadowAmnt
    }, 0.20],
    [{
      translateY: '0%'
    }, 0.60],
    [{
      translateY: '0%',
      scale: '1',
      // boxShadowBlur: '0'
    }, 0.20]
  ]
});


/**
 * Слайдер
 * Кастомный слайдер использует Velocity and Velocity UI эффекты
 */

var VeloSlider = (function() {

  /**
   *  Глобальные настройки
   */
  var settings = {
    veloInit: $('.velo-slides').data('velo-slider'),
    $veloSlide: $('.velo-slide'),
    veloSlideBg: '.velo-slide__bg',
    navPrev:  $('.velo-slides-nav').find('a.js-velo-slides-prev'),
    navNext:  $('.velo-slides-nav').find('a.js-velo-slides-next'),
    veloBtn:   $('.velo-slide__btn'),
    delta: 0,
    scrollThreshold: 7,
    currentSlide: 1,
    animating: false,
    animationDuration: 2000
  };


  // Флажки
  var delta = 0,
      animating = false;

  return {
   
      /**
       * Init 
       */
      init: function() {
        this.bind();
      },
    
    /**
     * Бинд прокрутов, кликов, эффектов
     */
    bind: function(){
 
      //  Активность первого слайда
      settings.$veloSlide.first().addClass('is-active');

      //  Init с атрибутом данных
      //  Связывание ключей, анимаций, скролла
      if (settings.veloInit == 'on') {
        VeloSlider.initScrollJack();
        $(window).on('DOMMouseScroll mousewheel', VeloSlider.scrollJacking);
      }

      // Стрелки / Кликабельная навигация
      settings.navPrev.on('click', VeloSlider.prevSlide);
      settings.navNext.on('click', VeloSlider.nextSlide);
    
      // навигация ключа
      $(document).on('keydown', function(e) {
        var keyNext = (e.which == 39 || e.which == 40),
            keyPrev = (e.which == 37 || e.which == 38);

        if (keyNext && !settings.navNext.hasClass('inactive')) {
          e.preventDefault();
          VeloSlider.nextSlide();

        } else if (keyPrev && (!settings.navPrev.hasClass('inactive'))) {
          e.preventDefault();
          VeloSlider.prevSlide();
        }
      });
    
      //Зададим навигацию видимым стрелкам
      VeloSlider.checkNavigation();

      // Вызов анимации
      VeloSlider.hoverAnimation();
     
    },

    /**
     * Hover анимация
     * Добавим 'is-hovering' к текущему слайду
     * При наведении курсора на кнопку
     */
    hoverAnimation: function(){
      settings.veloBtn.hover(function (){
        $(this).closest(settings.$veloSlide).toggleClass('is-hovering');
      });
    },

    /** 
     * Зададим анимацию
     * Определяет последовательность анимации, вызывая наши зарегистрированные эффекты скорости
     * @see js/components/_velocity-effects.js
     */
    setAnimation: function(midStep, direction) {
      
      // Переменные для наших эффектов скорости
      var animationVisible = 'translateNone',
          animationTop = 'translateUp',
          animationBottom = 'translateDown',
          easing = 'ease',
          animDuration = settings.animationDuration;

      // Центральный шаг
      if (midStep) {
        animationVisible = 'scaleUp.moveUp.scroll';
        animationTop = 'scaleDown.moveUp.scroll';
        animationBottom = 'scaleDown.moveDown.scroll';
      
      } else {
        animationVisible = (direction == 'next') ? 'scaleUp.moveUp' : 'scaleUp.moveDown';
        animationTop = 'scaleDown.moveUp';
        animationBottom = 'scaleDown.moveDown';
      }

      return [animationVisible, animationTop, animationBottom, animDuration, easing];
    },

    /** 
     * Init скролл Jaclk
     */
    initScrollJack: function() {

      var visibleSlide = settings.$veloSlide.filter('.is-active'),
          topSection = visibleSlide.prevAll(settings.$veloSlide),
          bottomSection = visibleSlide.nextAll(settings.$veloSlide),
          animationParams = VeloSlider.setAnimation(false),
          animationVisible = animationParams[0],
          animationTop = animationParams[1],
          animationBottom = animationParams[2];
          console.log(animationParams);
          console.log(animationParams[4]);

      visibleSlide.children('div').velocity(animationVisible, 1, function() {
        visibleSlide.css('opacity', 1);
        topSection.css('opacity', 1);
        bottomSection.css('opacity', 1);
      });

      topSection.children('div').velocity(animationTop, 0);
      bottomSection.children('div').velocity(animationBottom, 0);
    },

    /**
     * Scroll Jack
     * Прокрутка мыши
     */
    scrollJacking: function(e) {
      if (e.originalEvent.detail < 0 || e.originalEvent.wheelDelta > 0) {
        delta--;
        (Math.abs(delta) >= settings.scrollThreshold) && VeloSlider.prevSlide();
      } else {
        delta++;
        (delta >= settings.scrollThreshold) && VeloSlider.nextSlide();
      }
      return false;
    },

    /**
     * Предыдущий слайд
     */
    prevSlide: function(e) {
      //Перейти в предыдущий раздел
      typeof e !== 'undefined' && e.preventDefault();
      
      var visibleSlide = settings.$veloSlide.filter('.is-active'),
          animationParams = VeloSlider.setAnimation(midStep, 'prev'),
          midStep = false;
      
      visibleSlide = midStep ? visibleSlide.next(settings.$veloSlide) : visibleSlide;

      console.log(midStep);

      if (!animating && !visibleSlide.is(":first-child")) {
        animating = true;
        
        visibleSlide
          .removeClass('is-active')
          .children(settings.veloSlideBg)
          .velocity(animationParams[2], animationParams[3], animationParams[4])
          .end()
          .prev(settings.$veloSlide)
          .addClass('is-active')
          .children(settings.veloSlideBg)
          .velocity(animationParams[0], animationParams[3], animationParams[4], function() {
            animating = false;
          });
        currentSlide = settings.currentSlide - 1;
      }
      VeloSlider.resetScroll();
    },


    /** 
     * Следующий слайд
     */
    nextSlide: function(e) {
      
      //Переход к след секции
      typeof e !== 'undefined' && e.preventDefault();
      
      var visibleSlide = settings.$veloSlide.filter('.is-active'),
          animationParams = VeloSlider.setAnimation(midStep, 'next'),
          midStep = false;

      if (!animating && !visibleSlide.is(":last-of-type")) {
        animating = true;

        visibleSlide.removeClass('is-active')
          .children(settings.veloSlideBg)
          .velocity(animationParams[1], animationParams[3])
          .end()
          .next(settings.$veloSlide)
          .addClass('is-active')
          .children(settings.veloSlideBg)
          .velocity(animationParams[0], animationParams[3], function() {
            animating = false;
        });
        currentSlide = settings.currentSlide + 1;
      }
      VeloSlider.resetScroll();
    },

    /**
     * Ресет скролла 
     */
    resetScroll: function() {
      delta = 0;
      VeloSlider.checkNavigation();
    },

    /**
     * Просмотр навигации
     * Добавляем / скрываем базовую навигацию на последнем слайде 
     * @todo - loop slides, without cloning if possible
     */
    checkNavigation: function() {
      //Обновление видимости навигационных стрелок 
      (settings.$veloSlide.filter('.is-active').is(':first-of-type')) ? settings.navPrev.addClass('inactive'): settings.navPrev.removeClass('inactive');
      (settings.$veloSlide.filter('.is-active').is(':last-of-type')) ? settings.navNext.addClass('inactive'): settings.navNext.removeClass('inactive');

    },
  };
})();

// INIT
VeloSlider.init();