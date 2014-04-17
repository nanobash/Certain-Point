/**
 * 
 * @projectDescription (Certain Point) Lightweight Functional Style JavaScript Framework Providing Commonly Used Set Of Functions
 * 
 * @author	Tornike Nanobashvili
 * 
 * @copyright	Copyright (c) 2014
 * 
 * @license	http://www.opensource.org/licenses/mit-license.html  MIT License
 * 
 * @example	Any function within the framework can be invoked like CP.*functionName*
 * 
 */

;(function() {
	
	"use strict";
	
	var scope = this || window; // defining scope
	
	var message = { /** @private, Messages list */
		'inv_args'  : 'Invalid Argument(s) Supplied !',
		'inv_base'  : 'Function Doesn\'t Support Convertation On Specified Base !',
		'success'   : '"Certain Point" Has Been Successfully Initialized !'
	};
	
	function log( msgs, flag ) { /** @private, Function for messages logging */
		flag = ( typeof flag === 'undefined' || flag === true ) ? true : false;
		for ( var i = 0; i < msgs.length; i++ ) {
			console.log( msgs[i] );
			if ( flag ) {
				alert( msgs[i] );
			}
		}
	}
	
	/**
	* @classDescription This class creates a new CP.
	* @constructor  CP
	*/
	function CP() {
		var _scope = this;
		
		/**
		* This function defends public functions from wrong arguments
		* @private
		* @return {Boolean}
		*/
		function defend( args, types ) {
			if ( args.length === 0 ) {
				return false;
			}
			for ( var i = 0; i < args.length; i++ ) {
				if ( _scope.type(args[i]) != types[i] ) {
					return false;
				}
			}
			return true;
		}
		
		/**
		* This function creates an array of types for argument defending purposes
		* @private
		* @return {Array}
		*/
		function createTypes( args, str ) {
			var ret = [];
			for ( var i = 0; i < args.length; i++ ) {
				ret.push(str);
			}
			return ret;
		}
		
		// ------------------------------------------------------------------------     Collection functions     ------------------------------------------------------------------------
		
		/**
		 * Function returns type of the specified argument
		 * @param {arg} Any type of argument is applicable
		 * @return {String}
		 */
		this.type = function( arg ) {
			return /^.\w+\s(\w+).$/.exec(Object.prototype.toString.call(arg))[1].toLowerCase();
		};
		
		/**
		 * Function checks if specified argument's type is a number
		 * @param {arg} Any type of argument is applicable
		 * @return {Boolean}
		 */
		this.isNumber = function( arg ) {
			return ( this.type(arg) === 'number' );
		};
		
		/**
		 * Function checks if specified argument's type is a function
		 * @param {arg} Any type of argument is applicable
		 * @return {Boolean}
		 */
		this.isFunction = function( arg ) {
			return ( this.type(arg) === 'function' );
		};
		
		/**
		 * Function checks if specified argument's type is a date
		 * @param {arg} Any type of argument is applicable
		 * @return {Boolean}
		 */
		this.isDate = function( arg ) {
			return ( this.type(arg) === 'date' );
		};
		
		/**
		 * Function checks if specified argument's type is an arguments
		 * @param {arg} Any type of argument is applicable
		 * @return {Boolean}
		 */
		this.isArguments = function ( arg ) {
			return ( this.type(arg) === 'arguments' );
		};
		
		/**
		 * Function checks if specified argument's type is an object
		 * @param {arg} Any type of argument is applicable
		 * @return {Boolean}
		 */
		this.isObject = function ( arg ) {
			return ( this.type(arg) === 'object' );
		};
		
		/**
		 * Function checks if specified argument's type is an array
		 * @param {arg} Any type of argument is applicable
		 * @return {Boolean}
		 */
		this.isArray = function( arg ) {
			return ( this.type(arg) === 'array' );
		};
		
		/**
		 * Function checks if specified argument's type is a regexp
		 * @param {arg} Any type of argument is applicable
		 * @return {Boolean}
		 */
		this.isRegExp = function( arg ) {
			return ( this.type(arg) === 'regexp' );
		};
		
		/**
		 * Function checks if specified argument's type is a boolean
		 * @param {arg} Any type of argument is applicable
		 * @return {Boolean}
		 */
		this.isBoolean = function( arg ) {
			return ( this.type(arg) === 'boolean' );
		};
		
		/**
		 * Function checks if specified argument's type is a null
		 * @param {arg} Any type of argument is applicable
		 * @return {Boolean}
		 */
		this.isNull = function( arg ) {
			return ( this.type(arg) === 'null' );
		};
		
		/**
		 * Function checks if specified argument's type is an undefined
		 * @param {arg} Any type of argument is applicable
		 * @return {Boolean}
		 */
		this.isUndefined = function( arg ) {
			return ( this.type(arg) === 'undefined' );
		};
		
		/**
		 * Function checks if specified array is an empty
		 * @param {arg} Array is applicable
		 * @return {Boolean}
		 */
		this.isEmpty = function ( arg ) {
			if ( !defend(arguments,['array']) ) {
				return log([message.inv_args]);
			}
			return ( arg.length == 0 );
		};
		
		/**
		 * Function iterates through the specified object elements and returns the function with following parameters : (context CP), value, index, object itself
		 * @param {obj}	Array and Object are applicable
		 * @param {fn}	User defined function
		 * @return {Function} Returns an user defined function
		 */
		this.each = function( obj, fn ) {
			if ( this.type(obj) === 'object' || this.type(obj) === 'array' ) {
				for ( var i in obj ) {
					if ( obj.hasOwnProperty(i) ) {
						fn.call(this || null, obj[i], i, obj);
					}
				}
			} else {
				return log([message.inv_args]);
			}
		};
		
		/**
		 * Function iterates through the specified object elements and returns the function with following parameters : (context CP), previous value, current value, index, next value, object itself
		 * @param {obj}	Array and Object are applicable
		 * @param {fn}	User defined function
		 * @return {Function} Returns an user defined function
		 */
		this.eachSide = function( obj, fn ) {
			if ( this.type(obj) === 'object' || this.type(obj) === 'array' ) {
				var prev = obj[0], next = obj[1];
				for ( var i in obj ) {
					if ( obj.hasOwnProperty(i) ) {
						if ( i != 0 ) {
							prev = obj[parseInt(i) - 1];
						}
						if ( typeof obj[parseInt(i) + 1] !== 'undefined' ) {
							next = obj[parseInt(i) + 1];
						}
						fn.call(this || null, prev, obj[i], i, next, obj);
					}
				}
			} else {
				return log([message.inv_args]);
			}
		};
		
		/**
		 * Function iterates through the specified object elements and returns the new array based on user defined function
		 * @param {obj}	Array and Object are applicable
		 * @param {fn}	User defined function
		 * @return {Array} Returns a new array
		 */
		this.map = function( obj, fn ) {
			if ( this.type(obj) === 'object' || this.type(obj) === 'array' ) {
				var ret = [];
				for ( var i in obj ) {
					if ( obj.hasOwnProperty(i) ) {
						ret.push(fn.call(this || null, obj[i], i, obj));
					}
				}
				return ret;
			}
			return log([message.inv_args]);
		};
		
		/**
		 * Function iterates through the specified object elements and returns the new array of elements where user defined function returns true (Boolean)
		 * @param {obj}	Array and Object are applicable
		 * @param {fn}	User defined function
		 * @return {Array} Returns a new array
		 */
		this.filter = function( obj, fn ) {
			if ( this.type(obj) === 'object' || this.type(obj) === 'array' ) {
				var ret = [];
				for ( var i in obj ) {
					if ( obj.hasOwnProperty(i) ) {
						if ( fn.call(this || null, obj[i], i, obj) ) {
							ret.push(obj[i]);
						}
					}
				}
				return ret;
			}
			return log([message.inv_args]);
		};
		
		/**
		 * Function returns a new object where the keys will become the values and the values the keys
		 * @param {obj}	Object is applicable
		 * @return {Array} Returns a new inverted array
		 */
		this.invert = function( obj ) {
			if ( !defend(arguments,['object']) ) {
				return log([message.inv_args]);
			}
			var ret = {};
			this.each(obj, function(v,i) {
				ret[v] = i;
			});
			return ret;
		};
		
		/**
		 * Function returns (Boolean) based on specified two objects are equal
		 * @param {objA}	 Object is applicable
		 * @param {objB}	 Object is applicable
		 * @return {Boolean} Returns a new inverted array
		 */
		this.isEqual = function( objA, objB ) {
			if ( !defend(arguments,['object','object']) ) {
				return log([message.inv_args]);
			}
			var temp = this.invert(objB);
			for ( var i in objA ) {
				if ( objA.hasOwnProperty(i) ) {
					if ( i !== temp[objA[i]] ) {
						return false;
					}
				}
			}
			return true;
		};
		
		/**
		 * Function returns clone of the specified list
		 * @param {obj}	 Object is applicable
		 * @return {Object} Returns a clone of the object
		 */
		this.clone = function( obj ) {
			if ( !defend(arguments,['object']) ) {
				return log([message.inv_args]);
			}
			var ret = {};
			for ( var i in obj ) {
				if ( this.isObject(obj[i]) && !this.isNull(obj[i]) ) {
					ret[i] = this.clone(obj[i]);
				} else {
					ret[i] = obj[i];
				}
			}
			return ret;
		};
		
		/**
		 * Function returns the value from the object based on index
		 * @param {obj}	 	Object is applicable
		 * @param {index}	Object index is applicable
		 * @return {Any}	Returns array element
		 */
		this.indexBy = function( obj, index ) {
			if ( !defend(arguments,['object','string']) ) {
				return log([message.inv_args]);
			}
			for ( var i in obj ) {
				if ( obj.hasOwnProperty(i) ) {
					if ( i == index ) {
						return obj[i];
					}
				}
			}
		};
		
		/**
		 * Function returns a new merged object by specified objects
		 * @param {objA}	 Object is applicable
		 * @param {objB}	 Object is applicable
		 * @return {Object}	 Returns a new object
		 */
		this.mergeLists = function( objA, objB ) {
			if ( !defend(arguments,['object','object']) ) {
				return log([message.inv_args]);
			}
			var ret = {};
			this.each(objA, function(v,i) {
				ret[i] = v;
			});
			this.each(objB, function(v,i) {
				ret[i] = v;
			});
			return ret;
		};
		
		/**
		 * Function escapes whitespaces from boths sides
		 * @param {str}	 String is applicable
		 * @return {String}	 Returns a trimmed string
		 */
		this.trim = function( str ) {
			return str.replace(/^\s+|\s+$/g,"");
		};
		
		/**
		 * Function escapes whitespaces from right side
		 * @param {str}	 String is applicable
		 * @return {String}	 Returns a trimmed string
		 */
		this.rtrim = function( str ) {
			return str.replace(/\s+$/,"");
		};
		
		/**
		 * Function escapes whitespaces from left side
		 * @param {str}	 String is applicable
		 * @return {String}	 Returns a trimmed string
		 */
		this.ltrim = function( str ) {
			return str.replace(/^\s+/,"");
		};
		// ------------------------------------------------------------------     End Of Collection functions     -----------------------------------------------------------------------
		
		// ------------------------------------------------------------------------     String functions     ------------------------------------------------------------------------
		/**
		 * Function checks if specified argument's type is a string
		 * @param {str} Any type of argument is applicable
		 * @return {Boolean}
		 */
		this.isString = function( str ) {
			return ( this.type(str) === 'string' );
		};
		
		/**
		 * Function returns capitalized string
		 * @param {str} Any type of argument is applicable
		 * @return {String} Returns capitalized string
		 */
		this.capitalize = function( str ) {
			return str[0].toUpperCase() + str.substr(1).toLowerCase();
		};
		
		/**
		 * Function checks if specified string is a palindrome
		 * @param {str} String is applicable
		 * @return {Boolean}
		 */
		this.palindrome = function( str ) {
			var len = str.length;
			for ( var i = 0; i < Math.floor(len/2); i++ ) {
				if ( str.charAt(i) !== str.charAt(len - 1 - i) ) {
					return false;
				}
			}
			return true;
		};
		
		/**
		 * Function returns random character between specified arguments
		 * @param {charFrom} Character is applicable
		 * @param {charTo}	 Character is applicable
		 * @return {Boolean} Returns random character
		 */
		this.randomChar = function( charFrom, charTo ) {
			if ( !defend([charFrom,charTo],['string','string']) ) {
				return log([message.inv_args]);
			}
			return String.fromCharCode(this.random(String.charCodeAt(charFrom), String.charCodeAt(charTo) + 1));
		};
		// ------------------------------------------------------------------     End Of String functions     -----------------------------------------------------------------------
		
		// ------------------------------------------------------------------------     Array functions     -------------------------------------------------------------------------
		/**
		 * Function returns sorted array based on flag (default true) parameter, true asc, false desc
		 * @param {array} Array is applicable
		 * @param {flag} Optional
		 * @return {Array} Returns sorted array
		 */
		this.sort = function( array, flag ) {
			flag = ( typeof flag === 'undefined' || flag === true ) ? true : false;
			if ( defend(array, createTypes(array, 'number')) ) {
				if ( flag ) {
					return array.sort(function(a,b){
						return (a-b);
					});
				} else {
					return array.sort(function(a,b){
						return (b-a);
					});
				}
			} else {
				if ( flag ) {
					return array.sort();
				} else {
					return array.sort().reverse();
				}
			}
		};
		
		/**
		 * Function returns a new array without/with arrB elements, flag optional (default true), true -> unique elements from first array, false -> repeated elements
		 * @param {arrA} Array is applicable
		 * @param {arrB} Array is applicable
		 * @param {flag} Optional
		 * @return {Array} Returns sorted array
		 */
		this.eliminate = function( arrA, arrB, flag ) {
			if ( !defend([arrA, arrB], ['array','array']) ) {
				return log([message.inv_args]);
			}
			flag = ( typeof flag === 'undefined' || flag === true ) ? true : false;
			var ret = ( flag ) ? this.filter(arrA, function(v) {
				return ( arrB.indexOf(v) === -1 );
			}) : this.filter(arrA, function(v) {
				return ( arrB.indexOf(v) !== -1 );
			});
			return ret;
		};
		
		/**
		 * Functions returns a new array with distinct elements
		 * @param {array} Array is applicable
		 * @return {Array} Returns array with distinct elements
		 */
		this.distinct = function( array ) {
			if ( !defend(arguments, ['array']) ) {
				return log([message.inv_args]);
			}
			var ret = [];
			this.each(array, function(v) {
				if ( ret.indexOf(v) === -1 ) {
					ret.push(v);
				}
			});
			return ret;
		};
		
		/**
		 * Functions returns a new array with distinct elements after merging arrays
		 * @param {array,...[array]} Array is applicable
		 * @return {Array} Returns a new array with distinct elements
		 */
		this.union = function() {
			var types = createTypes(arguments, 'array');
			if ( !defend(arguments, types) ) {
				return log([message.inv_args]);
			}
			var ret = [];
			for ( var i = 0; i < arguments.length; i++ ) {
				ret = ret.concat(arguments[i]);
			}
			ret = this.distinct(ret);
			return ret;
		};
		
		/**
		 * Functions returns a new array of repeated elements
		 * @param {array} Array is applicable
		 * @return {Array} Returns array of repeated elements
		 */
		this.repeat = function( array ) {
			if ( !defend(arguments, ['array']) ) {
				return log([message.inv_args]);
			}
			var ret = [];
			this.each(array, function(v,i,o) {
				o.splice(i,1);
				if ( array.indexOf(v) !== -1 ) {
					ret.push(v);
				}
				o.splice(i,0,v);
			});
			ret = this.distinct(ret);
			return ret;
		};
		
		/**
		 * Functions returns a new array with unique elements
		 * @param {array} Array is applicable
		 * @return {Array} Returns array with unique elements
		 */
		this.unique = function( array ) {
			if ( !defend(arguments, ['array']) ) {
				return log([message.inv_args]);
			}
			return this.eliminate(array, this.repeat(array));
		};
		
		/**
		 * Functions returns Boolean based on existence of element in array
		 * @param {array} Array is applicable
		 * @param {value} Array element
		 * @return {Boolean} Returns Boolean
		 */
		this.contains = function( array, value ) {
			if ( !defend([array], ['array']) ) {
				return log([message.inv_args]);
			}
			if ( this.isInteger(value) ) {
				value = parseInt(value);
			}
			return (array.indexOf(value) !== -1);
		};
		
		/**
		 * Functions returns a new array with first n elements from the array
		 * @param {array} Array is applicable
		 * @param {n} Optional
		 * @return {Array} Returns first n elements from the array
		 */
		this.first = function( array, n ) {
			n = ( typeof n === 'undefined' || !this.isInteger(n) ) ? 1 : n;
			if ( !defend([array], ['array']) ) {
				return log([message.inv_args]);
			}
			var ret = [];
			for ( var i = 0; i < array.length; i++ ) {
				if ( n > 0 ) {
					if ( !this.isUndefined(array[i]) ) {
						ret.push(array[i]);
					}
				}
				n--;
			}
			return ret;
		};
		
		/**
		 * Functions returns a new array with last n elements from the array
		 * @param {array} Array is applicable
		 * @param {n} Optional
		 * @return {Array} Returns last n elements from the array
		 */
		this.last = function( array, n ) {
			if ( !defend([array], ['array']) ) {
				return log([message.inv_args]);
			}
			array = array.reverse();
			return this.first(array,n).reverse();
		};
		
		/**
		 * Functions returns a new array from start index to to index elements from the array
		 * @param {array} Array is applicable
		 * @param {fr} From array index
		 * @param {to} To array index
		 * @return {Array} Returns rest elements from the array
		 */
		this.rest = function( array, fr, to ) {
			if ( this.type(array) === 'array' && this.isInteger(fr) && this.isInteger(to) ) {
				return array.slice(fr, to);
			}
			return log([message.inv_args]);
		};
		
		/**
		 * Functions returns a new array of random n elements from the array
		 * @param {array} Array is applicable
		 * @param {n} Optional
		 * @return {Array} Returns random n elements from the array
		 */
		this.randElem = function( array, n ) {
			if ( !defend([array], ['array']) ) {
				return log([message.inv_args]);
			}
			n = ( typeof n === 'undefined' || !this.isInteger(n) ) ? 1 : n;
			var ret = [], r = Math.floor(Math.random() * array.length);
			for ( var i = 0; i < array.length; i++ ) {
				if ( n > 0 ) {
					while ( ret.indexOf(array[r]) !== -1 ) {
						r = Math.floor(Math.random() * array.length);
					}
					ret.push(array[r]);
				} else {
					break;
				}
				n--;
			}
			return ret;
		};
		
		/**
		 * Functions returns a shuffled copy of the array
		 * @param {array} Array is applicable
		 * @return {Array} Returns a shuffled copy of the array
		 */
		this.shuffle = function( array ) {
			if ( !defend(arguments, ['array']) ) {
				return log([message.inv_args]);
			}
			return this.randElem(array,array.length);
		};
		
		/**
		 * Functions Boolean if user defined function will pass at least once
		 * @param {array} Array is applicable
		 * @param {fn} User defined function
		 * @return {Array} Returns boolean
		 */
		this.some = function( array, fn ) {
			if ( !defend([array], ['array']) ) {
				return log([message.inv_args]);
			}
			for ( var i = 0; i < array.length; i++ ) {
				if ( fn.call(array || null, array[i], i, array) ) {
					return true;
				}
			}
			return false;
		};
		
		/**
		 * Functions Boolean if user defined function will pass for all array elements
		 * @param {array} Array is applicable
		 * @param {fn} User defined function
		 * @return {Array} Returns boolean
		 */
		this.every = function( array, fn ) {
			if ( !defend([array], ['array']) ) {
				return log([message.inv_args]);
			}
			for ( var i = 0; i < array.length; i++ ) {
				if ( !fn.call(array || null, array[i], i, array) ) {
					return false;
				}
			}
			return true;
		};
		
		/**
		 * Functions returns keys of the object
		 * @param {obj} Object is applicable
		 * @return {Array} Returns array
		 */
		this.keys = function( obj ) {
			if ( !defend(arguments, ['object']) ) {
				return log([message.inv_args]);
			}
			var ret = this.map(obj, function(v,i) {
				return i;
			});
			return ret;
		};
		
		/**
		 * Functions returns values of the object
		 * @param {obj} Object is applicable
		 * @return {Array} Returns array
		 */
		this.values = function( obj ) {
			if ( !defend(arguments, ['object']) ) {
				return log([message.inv_args]);
			}
			var ret = this.map(obj, function(v) {
				return v;
			});
			return ret;
		};
		
		/**
		 * Functions returns an array ranged from start to stop by step
		 * @param {start} Number is applicable
		 * @param {stop}  Number is applicable
		 * @param {step}  Number is applicable
		 * @return {Array} Returns array
		 */
		this.range = function( start, stop, step ) {
			if ( arguments.length === 0 || !defend(arguments, ['number','number','number']) ) {
				return log([message.inv_args]);
			}
			var ret = [];
			for ( var i = start; i < stop; i += step ) {
				ret.push(i);
			}
			return ret;
		};
		// ----------------------------------------------------------------------    End Of Array functions     ------------------------------------------------------------------------
		
		// ------------------------------------------------------------------------     Mathematical functions     ---------------------------------------------------------------------
		/**
		 * Function returns Boolean if specified argument is integer
		 * @param {n} Number is applicable
		 * @return {Boolean} 
		 */
		this.isInteger = function( n ) {
			return (n % 1 === 0);
		};
		
		/**
		 * Function returns min/max number from the array accordingly flag parameter
		 * @param {array} Number is applicable
		 * @param {flag}  True -> min, False -> max
		 * @return {number} 
		 */
		this.minMax = function( array, flag ) {
			if ( !defend([array],['array']) ) {
				return log([message.inv_args]);
			}
			flag = ( typeof flag === 'undefined' || flag === true ) ? true : false;
			var ret = array[0];
			for ( var i = 0; i < array.length; i++ ) {
				if ( flag ) {
					if ( array[i] < ret ) {
						ret = array[i];
					}
				} else {
					if ( array[i] > ret ) {
						ret = array[i];
					}
				}
			}
			return ret;
		};
		
		/**
		 * Function returns Boolean/Array based on flag parameter if the number is prime
		 * @param {n} Number is applicable
		 * @param {flag} True -> Display n primes from 0, False (default) -> boolean
		 * @return {Boolean/Array} 
		 */
		this.isPrime = function( n, flag ) {
			if ( !defend([n],['number']) ) {
				return log([message.inv_args]);
			}
			( typeof flag === "undefined" || flag === false ) ? flag = false : flag = true;
			
			function isPrime( num ) {
				if ( num === 0 || num === 1 ) {
					return false;
				}
				for ( var i = 2; i < num; i++ ) {
					if ( num % i === 0 ) {
						return false;
					}
				}
				return true;
			}
			
			if ( flag ) {
				var arr = [2];
				for ( var i = 3; i <= n; i+=2 ) {
					if ( isPrime(i) ) {
						arr.push(i);
					}
				}
				return arr;
			} else {
				return isPrime(n);
			}
		};
		
		/**
		 * Function returns Boolean/Array based on flag parameter
		 * @param {n} Number is applicable
		 * @param {flag} True -> Display facotiral of n based, False (default) -> Number
		 * @return {String/Number}
		 */
		this.isFactorial = function( n, flag ) {
			if ( !defend([n],['number']) ) {
				return log([message.inv_args]);
			}
			( typeof flag === "undefined" || flag === false ) ? flag = false : flag = true;
			
			if ( flag ) {
				var sum = 1;
				for ( var i = 1; i <= n && sum <= n; i++ ) {
					if ( sum === n ) {
						return n + " is factorial number based on " + (i - 1);
					}
					sum *= i;
				}
				return false;
			} else {
				var sum = 1;
				for ( var i = 1; i <= n; i++ ) {
					sum *= i;
				}
				return sum;
			}
		};
		
		/**
		 * Function returns Boolean/Array based on flag parameter if the number belongs to fibonacci number sequence
		 * @param {n} Number is applicable
		 * @param {flag} True -> Display n fibonacci numbers from 0 to n, False (default) -> boolean
		 * @return {Boolean/Array} 
		 */
		this.isFibonacci = function( n, flag ) {
			if ( !defend([n],['number']) ) {
				return log([message.inv_args]);
			}
			( typeof flag === "undefined" || flag === false ) ? flag = false : flag = true;
			
			var a = 0, b = 1, z = null;
			
			if ( flag ) {
				var arr = [];
				for ( var i = 0; i <= n; i++ ) {
					arr.push(a);
					z = a + b;
					a = b;
					b = z;
				}
				return arr;
			} else {
				for ( var i = 0; i <= n && a <= n; i++ ) {
					if ( a === n ) {
						return true;
					}
					z = a + b;
					a = b;
					b = z;
				}
				return false;
			}
		};
		// ----------------------------------------------------------------------    End Of Mathematical functions     -----------------------------------------------------------------
		
		// ------------------------------------------------------------------------     Utility functions     --------------------------------------------------------------------------
		/**
		 * Function returns an array of library function names
		 * @return {Array} Returns function names array
		 */
		this.functions = function() {
			var ret = [];
			this.each(this, function(v,i) {
				if ( _scope.isFunction(v) ) {
					ret.push(i);
				}
			});
			this.sort(ret);
			return ret;
		};
		
		var HTMLEntities = { /** @private, HTMLEntities list */
			'escape' : {
				'&' : '&amp;',
				'<' : '&lt;',
				'>' : '&gt;',
				'"' : '&quot;',
				'\'': '&#x27;',
				'(' : '&#40;',
				')' : '&#41;'
			},
			'unescape' : function() {
				return _scope.invert(this.escape);
			}
		};
		
		/**
		 * Function Adds entities to an escape list (HTMLEntities.escape)
		 * @param {list} Object is applicable
		 */
		this.addEntities = function( list ) {
			if ( !defend(arguments,['object']) ) {
				return log([message.inv_args]);
			}
			HTMLEntities.escape = this.mergeLists( HTMLEntities.escape, list );
			console.log(HTMLEntities.escape);
		};
		
		/**
		 * Function Removes entities from an escape list (HTMLEntities.escape)
		 * @param {array} Array is applicable
		 */
		this.removeEntities = function( array ) {
			if ( !defend(arguments,['array']) ) {
				return log([message.inv_args]);
			}
			var ret = {};
			this.each(HTMLEntities.escape, function(v,i) {
				if ( array.indexOf(i) == -1 ) {
					ret[i] = v;
				}
			});
			HTMLEntities.escape = ret;
		};
		
		/**
		 * Function returns escaped string based on HTMLEntities escape parameters
		 * @param {str} String is applicable
		 * @return {String} Returns trimmed string
		 */
		this.escape = function( str ) {
			if ( !defend(arguments,['string']) ) {
				return log([message.inv_args]);
			}
			return str.replace(new RegExp('[' + this.keys(HTMLEntities.escape).join('') + ']','g'),function(a) {
			    return _scope.indexBy(HTMLEntities.escape,a);
			});
		};
		
		/**
		 * Function returns unescaped string based on HTMLEntities escape parameters
		 * @param {str} String is applicable
		 * @return {String} Returns untrimmed string
		 */
		this.unescape = function( str ) {
			if ( !defend(arguments,['string']) ) {
				return log([message.inv_args]);
			}
			var un = HTMLEntities.unescape();
			return str.replace(new RegExp('(' + this.keys(un).join('|') + ')','g'),function(a) {
				return _scope.indexBy(un,a);
			});
		};
		
		/**
		 * Function returns converted string on specific base
		 * @param {str} String is applicable
		 * @param {base} Number is applicable
		 * @return {String} Returns converted string
		 */
		this.convert = function( str, base ) {
			if ( !defend(arguments,['string','number']) ) {
				return log([message.inv_args]);
			}
			if ( this.isInteger(str) ) {
				return parseInt(str).toString(base);
			} else {
				var n = ( base == 2 ) ? 8 : ( ( base == 8 ) ? 3 : ( base == 16 ) ? 2 : 0 );
				if ( n == 0 ) {
					return log([message.inv_base]);
				}
				var ret = '', temp = '';
				for ( var i = 0; i < str.length; i++ ) {
					temp += str.charCodeAt(i).toString(base);
					while ( temp.length < n ) {
						temp = '0' + temp;
					}
					ret += temp + ' ';
					temp = '';
				}
				return ret.trim();
			}
		};
		
		/**
		 * Function changes function context
		 * @param {context} Any context is applicable
		 * @param {fn} Function is applicable
		 * @return {Function} Returns function with specified context
		 */
		this.bind = function( context, fn ) {
			return function() {
				return fn.apply(context,arguments);
			};
		};
		
		/**
		 * Evaluates javascript after page is already loaded
		 * @param {code} JavaScript Code is applicable
		 */
		this.evaluate = function( code ) {
			code = code.replace(/^\s*|\s*$/g, "");
			if ( code ) {
				var head = document.getElementsByTagName("head")[0] || document.documentElement || document.body, script = document.createElement("script");
				script.type = "text/javascript";
				script.text = code;
				head.appendChild(script);
				head.removeChild(script);
			}
		};
		
		/**
		 * Function returns random number from 0 to x Or from x to y
		 * @param {x} Number is applicable
		 * @param {y} Optional Number is applicable
		 * @return {Function} Returns random number
		 */
		this.random = function( x, y ) {
			if ( !defend(arguments, ['number', 'number']) ) {
				return log([message.inv_args]);
			}
			if ( typeof y === 'undefined' ) {
				return Math.floor(Math.random() * x);
			}
			if ( x > y ) {
				return log([message.inv_args]);
			}
			var ret = Math.floor(Math.random() * y);
			while ( x > ret ) {
				ret = Math.floor(Math.random() * y);
			}
			return ret;
		};
		
		/**
		 * Function returns encrypted string
		 * @param {str} String is applicable
		 * @return {String}
		 */
		this.encrypt = function( str ) {
			if ( !defend([str], ['string']) ) {
				return log([message.inv_args]);
			}
			var ret = ''
			for ( var i = 0; i < str.length; i++ ) {
				ret += Math.pow(String.charCodeAt(str.charAt(i)),2);
			}
			return ret;
		};
		
		/**
		 * Function returns decrypted string (encrypted byencrypt function)
		 * @param {str} String is applicable
		 * @return {String}
		 */
		this.decrypt = function( str ) {
			if ( !defend([str], ['string']) ) {
				return log([message.inv_args]);
			}
			var ret = '', accum = '';
			for ( var i = 0; i < str.length; i++ ) {
				accum += str.charAt(i);
				if ( accum.length >= 4 && this.isInteger(Math.pow(accum,1/2)) ) {
					ret += String.fromCharCode(Math.pow(accum,1/2));
					accum = '';
				}
			}
			return ret;
		};
		
		/**
		 * Function returns elapsed time(s) array in milliseconds
		 * @param {CP.elapsed(1),CP.elapsed(n)...}
		 * @return {Array} Invoking result with CP.elapsed(0)
		 */
		this.elapsed = function() {
			if ( arguments.length > 1 || typeof arguments[0] !== 'number' ) {
				return log([message.inv_args]);
			}
			
			this.elapsed.elapsed_args = ( typeof this.elapsed.elapsed_args === 'undefined' ) ? [] : this.elapsed.elapsed_args;
			var ret = [];
			
			if ( arguments[0] === 0 ) { // pass 0 for get results
				for ( var i = 0; i < this.elapsed.elapsed_args.length; i++ ) {
					if ( this.elapsed.elapsed_args.hasOwnProperty(i) ) {
						if ( typeof this.elapsed.elapsed_args[i + 1] !== 'undefined' ) {
							ret.push(this.elapsed.elapsed_args[i + 1] - this.elapsed.elapsed_args[i]);
						}
					}
				}
				return ret;
			}
			
			this.elapsed.elapsed_args[arguments[0] - 1] = (new Date).getTime();
		};
		
		/**
		 * Function iterates user defined function n times
		 * @param {n}  Number is applicable
		 * @param {fn} Function is applicable
		 * @param {context} Any context is applicable
		 * @return {Function}
		 */
		this.iters = function( n, fn, context ) {
			if ( !defend([n,fn], ['number','function']) ) {
				return log([message.inv_args]);
			}
			for ( var i = 0; i < n; i++ ) {
				fn.call(context || fn, i);
			}
		};
		
		/**
		 * Function returns library object reference like e.g var a = CP.noConflict();
		 */
		this.noConflict = function() {
			return this;
		};
		
		/**
		 * Function makes asseration with valid parameter with specified desc in console
		 */
		this.assert = function( valid, desc ) {
			return ( valid ) ? desc + " : " + true : desc + " : " + false;
		};
		
		this.version = "1.0"; /** @private, library version variable */
	}
	
	if ( typeof scope.CP === 'undefined' ) {
		scope.CP = new CP();
		log([message.success], false);
	}
	
})();
