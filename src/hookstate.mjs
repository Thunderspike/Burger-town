import React from 'react';

function useState(initial, config) {
  if (config === void 0) config = {};
  var ref = React.useState(initial);
  var value = ref[0];
  var setValue = ref[1];
  var storage = config.storageType === "session" ? sessionStorage : localStorage;
  React.useEffect(function () {
    if (config.persist) {
      var local = storage.getItem(config.persist);

      if (local) {
        setValue(JSON.parse(local).value);
      }
    }
  }, []);
  React.useEffect(function () {
    if (config.persist) {
      storage.setItem(config.persist, JSON.stringify({
        value: value
      }));
    }
  }, [value]);
  return [value, setValue];
}

function useCssProperties(el) {
  if (el === void 0) el = document.documentElement;
  var set = React.useCallback(function (value) {
    Object.keys(value).map(function (k) {
      return el.style.setProperty("--" + k, value[k]);
    });
  }, []);
  return React.useMemo(function () {
    return {
      set: set
    };
  }, []);
}

function useBoolean(initial, config) {
  if (initial === void 0) initial = false;
  var ref = useState(initial, config);
  var value = ref[0];
  var setValue = ref[1];
  var set = React.useCallback(function () {
    return setValue(true);
  }, []);
  var reset = React.useCallback(function () {
    return setValue(false);
  }, []);
  var toggle = React.useCallback(function () {
    return setValue(!value);
  }, [value]);
  var onChange = React.useCallback(function (e) {
    return setValue(e.target.checked);
  }, []);
  return React.useMemo(function () {
    return {
      value: value,
      setValue: setValue,
      set: set,
      reset: reset,
      toggle: toggle,
      bindToInput: {
        onChange: onChange,
        checked: value
      }
    };
  }, [value]);
}

function useString(initial, config) {
  if (initial === void 0) initial = "";
  var ref = useState(initial, config);
  var value = ref[0];
  var set = ref[1];
  var clear = React.useCallback(function () {
    return set("");
  }, []);
  var onChange = React.useCallback(function (e) {
    return set(e.target.value);
  }, []);
  return React.useMemo(function () {
    return {
      value: value,
      set: set,
      clear: clear,
      bindToInput: {
        onChange: onChange,
        value: value
      }
    };
  }, [value]);
}

function useNumber(initial, config) {
  if (initial === void 0) initial = 0;
  var ref = useState(initial, config);
  var value = ref[0];
  var set = ref[1];
  var increment = React.useCallback(function () {
    return set(value + 1);
  }, []);
  var decrement = React.useCallback(function () {
    return set(value - 1);
  }, []);
  var onChange = React.useCallback(function (e) {
    return set(e.target.value);
  }, []);
  return React.useMemo(function () {
    return {
      value: value,
      set: set,
      increment: increment,
      decrement: decrement,
      bindToInput: {
        value: value,
        onChange: onChange
      }
    };
  }, [value]);
}

function useObject(initial, config) {
  var ref = useState(initial, config);
  var value = ref[0];
  var set = ref[1];
  var merge = React.useCallback(function (value2) {
    return set(Object.assign({}, value, value2));
  }, [value]);
  return React.useMemo(function () {
    return {
      value: value,
      set: set,
      merge: merge
    };
  }, [value]);
}

var isOnline = function isOnline() {
  return typeof navigator !== "undefined" && typeof navigator.onLine === "boolean" ? navigator.onLine : true;
};

var getScrollY = function getScrollY(ref) {
  return ref.pageYOffset !== undefined ? ref.pageYOffset : ref.scrollTop;
};

function useEventListener(eventName, handler, element) {
  if (element === void 0) element = window;
  var savedHandler = React.useRef();
  React.useEffect(function () {
    savedHandler.current = handler;
  }, [handler]);
  React.useEffect(function () {
    var isSupported = element && element.addEventListener;

    if (!isSupported) {
      return;
    }

    var eventListener = function eventListener(event) {
      return savedHandler.current(event);
    }; // Add event listener


    element.addEventListener(eventName, eventListener); // Remove event listener on cleanup

    return function () {
      element.removeEventListener(eventName, eventListener);
    };
  }, [eventName, element]);
}

function useScrollTrigger(prefs) {
  if (prefs === void 0) prefs = {
    threshold: 100,
    triggerOnUp: true
  };
  var element = prefs.element || window;
  var y = useScroll(element);
  var prevY = usePrevious(y);
  var trigger = useBoolean(prevY > prefs.threshold);
  React.useEffect(function () {
    trigger.setValue(y > prefs.threshold && (!prefs.triggerOnUp || y > prevY));
  }, [y]);
  return trigger.value;
}

function useOnline() {
  var ref = React.useState(isOnline());
  var online = ref[0];
  var setOnline = ref[1];
  useEventListener("online", function () {
    return setOnline(true);
  });
  useEventListener("offline", function () {
    return setOnline(false);
  });
  return online;
}

function useMount(delayMs) {
  if (delayMs === void 0) delayMs = 0;
  var delay = useBoolean(false);
  React.useEffect(function () {
    setTimeout(function () {
      return delay.set();
    }, delayMs);
  }, []);
  return delay.value;
}

function useScroll(element) {
  if (element === void 0) element = window;
  var ref = React.useState(getScrollY(element));
  var scroll = ref[0];
  var setScroll = ref[1];
  var delay = useMount(20);
  React.useEffect(function () {
    return setScroll(getScrollY(element));
  }, [delay]);
  useEventListener("scroll", function (e) {
    return setScroll(getScrollY(e.currentTarget));
  }, element);
  return scroll;
}

function usePrevious(value) {
  var ref = React.useRef();
  React.useEffect(function () {
    ref.current = value;
  }, [value]);
  return ref.current;
}

function useElementSize() {
  var ref = React.useRef(null);
  var ref$1 = useState({
    height: 0,
    width: 0,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  });
  var size = ref$1[0];
  var setSize = ref$1[1];
  var update = React.useCallback(function () {
    var ref$1 = ref.current.getBoundingClientRect();
    var width = ref$1.width;
    var height = ref$1.height;
    var top = ref$1.top;
    var bottom = ref$1.bottom;
    var left = ref$1.left;
    var right = ref$1.right;
    setSize({
      width: width,
      height: height,
      top: top,
      bottom: bottom,
      left: left,
      right: right
    });
  }, [ref, size]);
  React.useEffect(update, [ref]);
  useEventListener("resize", update);
  useEventListener("scroll", update);
  return React.useMemo(function () {
    return [ref, size];
  }, [size, ref]);
}

var breakpoints = {
  xl: 1920,
  lg: 1280,
  md: 960,
  sm: 600
};

var Sizing = function Sizing(e) {
  var this$1 = this;

  this.up = function (breakpoint) {
    return this$1.innerWidth >= breakpoints[breakpoint];
  };

  this.down = function (breakpoint) {
    return this$1.innerWidth <= breakpoints[breakpoint];
  };

  this.only = function (breakpoint) {
    return this$1.size === breakpoint;
  };

  this.between = function (lower, upper) {
    return this$1.innerWidth >= breakpoints[lower] && this$1.innerWidth <= breakpoints[upper];
  };

  this.innerWidth = e.innerWidth;
  this.innerHeight = e.innerHeight;
  this.outerWidth = e.outerWidth;
  this.outerHeight = e.outerHeight;
  var w = e.innerWidth;
  var size = "xs";

  if (w >= breakpoints.xl) {
    size = "xl";
  } else if (w >= breakpoints.lg) {
    size = "lg";
  } else if (w >= breakpoints.md) {
    size = "md";
  } else if (w >= breakpoints.sm) {
    size = "sm";
  }

  this.size = size;
};

function useSize() {
  var ref = useObject(new Sizing(window));
  var value = ref.value;
  var set = ref.set;
  useEventListener("resize", function (e) {
    return set(new Sizing(e.currentTarget));
  });
  return React.useMemo(function () {
    return value;
  }, [value]);
} // TODO: add media breakpoints, component hidden on certain media, persist version specific

export { useState, useCssProperties, useEventListener, useScrollTrigger, useOnline, usePrevious, useScroll, useElementSize, useMount, useBoolean, useNumber, useString, useObject, useSize };