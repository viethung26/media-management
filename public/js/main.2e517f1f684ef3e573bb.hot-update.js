webpackHotUpdate("main",{

/***/ "./src/components/Image.jsx":
/*!**********************************!*\
  !*** ./src/components/Image.jsx ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _image_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./image.css */ \"./src/components/image.css\");\n/* harmony import */ var _image_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_image_css__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\nfunction Image(props) {\n  var image = props.image,\n      views = props.views;\n  var name = image.key.substr(7);\n  var isDeleting = image.isDeleting ? \"deleting\" : \"\";\n  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"image \".concat(views.type, \" \").concat(isDeleting),\n    onClick: function onClick() {\n      return props.select(image.key);\n    },\n    title: name\n  }, image.isSelected ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"i\", {\n    className: \"fas fa-check-square selected\"\n  }) : null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"thumbnail\"\n  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\", {\n    src: image.public_url\n  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"i\", {\n    className: \"fas fa-sync-alt fa-spin deleting-spiner\"\n  })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"i\", {\n    className: \"fas fa-trash-alt delete\",\n    onClick: function onClick(e) {\n      e.stopPropagation();\n      props.delete(image.key);\n    }\n  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"title\"\n  }, image.isNew ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"i\", {\n    className: \"fas fa-check\"\n  }), \" \", name) : name), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"size\"\n  }, \"File size: \", image.size, \" KB\"));\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Image);\n\n//# sourceURL=webpack:///./src/components/Image.jsx?");

/***/ })

})