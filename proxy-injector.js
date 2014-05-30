/**
 * @author Antoine AGTHE
 */

( function ( appname )
{
    var app = angular.module( appname );

    function factory ( $injector )
    {
        function proxyInjector ()
        {
            var o = {};

            for ( var i = 0; i < arguments.length; i++ )
            {
                _setProxy.call( o, arguments[i] );
            }

            return o;
        }

        function _setProxy ( name )
        {
            var that = this;
            Object.defineProperty(
                that,
                name,
                {
                    get : function ()
                    {
                        var dep = $injector.get( name );
                        if ( dep != null )
                        {
                            _setDependency.call( that, name, dep );
                        }
                    },

                    configurable : true,
                    enumerable : true
                } );

        }

        function _setDependency ( name, dep )
        {
            Object.defineProperty( this, name, { value : dep, enumerable : true } );
        }

        return proxyInjector;
    }

    app.factory( 'proxyInjector', [ '$injector', factory ] );
} ) ( 'MODULE_NAME' );