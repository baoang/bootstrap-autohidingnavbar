;(function($, window, document, undefined) {
  'use strict';

  var pluginName = 'autoHidingNavbar',
      $window = $(window),
      $document = $(document),
      _rafPending = false,
      _resizeRafPending = false,
      _previousScrollTop = null,
      _windowHeight = $window.height(),
      _visible = true,
      _hideOffset,
      defaults = {
        disableAutohide: false,
        showOnUpscroll: true,
        showOnBottom: true,
        hideOffset: 'auto',
        animationDuration: 200
      };

  function injectTransitionStyle(duration) {
    var id = pluginName + '-style';
    if (document.getElementById(id)) return;

    var style = document.createElement('style');
    style.id = id;
    style.textContent =
      '.' + pluginName + '-animated {\n' +
      '  transition: top ' + (duration / 1000) + 's ease !important;\n' +
      '}\n' +
      '.' + pluginName + '-animated.' + pluginName + '-hidden {\n' +
      '  top: 0 !important;\n' +
      '}';
    document.head.appendChild(style);
  }

  function AutoHidingNavbar(element, options) {
    this.element = $(element);
    this.settings = $.extend({}, defaults, options);
    this._defaults = defaults;
    this._name = pluginName;
    this.init();
  }

  function hide(autoHidingNavbar) {
    if (!_visible) return;

    var navbar = autoHidingNavbar.element;
    navbar.addClass(pluginName + '-hidden');
    navbar.css('top', -navbar.height() + 'px');
    navbar.find('.dropdown.open .dropdown-toggle').dropdown('toggle');

    _visible = false;
  }

  function show(autoHidingNavbar) {
    if (_visible) return;

    autoHidingNavbar.element
      .removeClass(pluginName + '-hidden')
      .css('top', 0);
    _visible = true;
  }

  function detectState(autoHidingNavbar) {
    var scrollTop = $window.scrollTop(),
        scrollDelta = scrollTop - _previousScrollTop;

    _previousScrollTop = scrollTop;

    if (scrollDelta < 0) {
      if (_visible) return;
      if (autoHidingNavbar.settings.showOnUpscroll || scrollTop <= _hideOffset) {
        show(autoHidingNavbar);
      }
    } else if (scrollDelta > 0) {
      if (!_visible) {
        if (autoHidingNavbar.settings.showOnBottom &&
            scrollTop + _windowHeight === $document.height()) {
          show(autoHidingNavbar);
        }
        return;
      }
      if (scrollTop >= _hideOffset) {
        hide(autoHidingNavbar);
      }
    }
  }

  function scrollHandler(autoHidingNavbar) {
    if (autoHidingNavbar.settings.disableAutohide) return;
    detectState(autoHidingNavbar);
  }

  function bindEvents(autoHidingNavbar) {
    $document.on('scroll.' + pluginName, function() {
      if (_rafPending) return;
      _rafPending = true;
      requestAnimationFrame(function() {
        scrollHandler(autoHidingNavbar);
        _rafPending = false;
      });
    });

    $window.on('resize.' + pluginName, function() {
      if (_resizeRafPending) return;
      _resizeRafPending = true;
      requestAnimationFrame(function() {
        _windowHeight = $window.height();
        _resizeRafPending = false;
      });
    });
  }

  function unbindEvents() {
    $document.off('.' + pluginName);
    $window.off('.' + pluginName);
  }

  AutoHidingNavbar.prototype = {
    init: function() {
      this.elements = { navbar: this.element };

      this.setDisableAutohide(this.settings.disableAutohide);
      this.setShowOnUpscroll(this.settings.showOnUpscroll);
      this.setShowOnBottom(this.settings.showOnBottom);
      this.setHideOffset(this.settings.hideOffset);
      this.setAnimationDuration(this.settings.animationDuration);

      _hideOffset = this.settings.hideOffset === 'auto'
        ? this.element.height()
        : this.settings.hideOffset;

      injectTransitionStyle(this.settings.animationDuration);
      this.element.addClass(pluginName + '-animated');

      bindEvents(this);
      return this.element;
    },
    setDisableAutohide: function(value) {
      this.settings.disableAutohide = value;
      return this.element;
    },
    setShowOnUpscroll: function(value) {
      this.settings.showOnUpscroll = value;
      return this.element;
    },
    setShowOnBottom: function(value) {
      this.settings.showOnBottom = value;
      return this.element;
    },
    setHideOffset: function(value) {
      this.settings.hideOffset = value;
      return this.element;
    },
    setAnimationDuration: function(value) {
      this.settings.animationDuration = value;
      return this.element;
    },
    show: function() {
      show(this);
      return this.element;
    },
    hide: function() {
      hide(this);
      return this.element;
    },
    destroy: function() {
      unbindEvents(this);
      this.element
        .removeClass(pluginName + '-animated ' + pluginName + '-hidden')
        .css('top', '');
      $.data(this, 'plugin_' + pluginName, null);
      return this.element;
    }
  };

  $.fn[pluginName] = function(options) {
    var args = arguments;
    if (options === undefined || typeof options === 'object') {
      return this.each(function() {
        if (!$.data(this, 'plugin_' + pluginName)) {
          $.data(this, 'plugin_' + pluginName, new AutoHidingNavbar(this, options));
        }
      });
    } else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {
      var returns;
      this.each(function() {
        var instance = $.data(this, 'plugin_' + pluginName);
        if (instance instanceof AutoHidingNavbar && typeof instance[options] === 'function') {
          returns = instance[options].apply(instance, Array.prototype.slice.call(args, 1));
        }
      });
      return returns !== undefined ? returns : this;
    }
  };

})(jQuery, window, document);
