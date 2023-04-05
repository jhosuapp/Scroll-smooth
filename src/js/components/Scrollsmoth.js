const ScrollSmoth = (()=>{

    //=======================================//
    //CONFIGURACIÓN GENERAL DEL SCROLL ANIMADO
    //======================================//
    const configScrollSmoth = ()=>{
        const body = document.body;
        const main = document.getElementById('main');
        let sx = 0, // For scroll positions
            sy = 0;
        let dx = sx, // For container positions
            dy = sy;
        body.style.height = main.clientHeight + 'px';
        
        main.style.position = 'fixed';
        main.style.top = 0;
        main.style.left = 0;
        window.addEventListener('scroll', easeScroll);

        window.addEventListener('scroll', ()=>{
            body.style.height = main.clientHeight + 'px';
        });
        
        window.addEventListener('resize', ()=>{
            body.style.height = main.clientHeight + 'px';
        });

        function easeScroll() {
            sx = window.pageXOffset;
            sy = window.pageYOffset;
        }
        
        window.requestAnimationFrame(render);

        function render() {
            //We calculate our container position by linear interpolation method
            dx = li(dx, sx, 0.07);
            dy = li(dy, sy, 0.07);

            dx = Math.floor(dx * 100) / 100;
            dy = Math.floor(dy * 100) / 100;

            main.style.transform = `translate3d(-${dx}px, -${dy}px, 0px)`;
            window.requestAnimationFrame(render);
        }

        function li(a, b, n) {
            return (1 - n) * a + n * b;
        }
    }


    //===========================================================//
    //CALCULO DEL TAMAÑO DE LA BARRA Y ANIMACIÓN SEGÚN LA POSICIÓN
    //===========================================================//
    const ScrollSmothNav = ()=>{
        //FUNCIÓN PARA EJECUTAR CUANDO SEA NECESARIO
        const reUseCalcNav = ()=>{
            //OBTENEMOS ALTO DE PANTALLA, POSICION DE SCROLL Y EL SCROLL DEL DOM
            const getHeightScreen = screen.height;
            const getHeightPositionScroll = window.scrollY;
            const getScroll = document.querySelector('.main-scroll');
            const getHeihgtMain = document.querySelector('#main').clientHeight;
            //OBTENEMOS EL PORCENTAJE Y HACEMOS EL CALCULO
            const calcHeihgtNav = (100 * getHeightScreen) / getHeihgtMain;
            getScroll.style.height = `${calcHeihgtNav}%`;
            //CALCULAMOS LA POSICIÓN DEL NAV DEPENDIENDO LA POSICIÓN DEL SCROLL
            const calcPercent = (90 * getHeightPositionScroll) / getHeihgtMain;
            getScroll.style.top = `${calcPercent}%`;
        }
        //EJECUCIÓN PRIMARIA DE LA FUNCIÓN 
        reUseCalcNav();
        //EJECUCIÓN DE LA FUNCIÓN CUANDO SE REDIMENSIONA LA PANTALLA
        window.addEventListener('resize', ()=>{
            reUseCalcNav();
        });
        //EJECUCUÓN DE LA FUNCIÓN CUANDO SE HACE SCROLL
        window.addEventListener('scroll', ()=>{
            reUseCalcNav();
        });

    }


    //=======================================//
    //SE RETORNAN TODAS LAS FUNCIONES HIJAS
    //=======================================//

    return {
        getChilds: function(){
            configScrollSmoth();
            ScrollSmothNav();
        }
    }

})();

const getChildScrollSmoth = ()=>{ 
    ScrollSmoth.getChilds(); 
}

export { getChildScrollSmoth }