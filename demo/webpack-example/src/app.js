import './css/common.css';
import layer from './components/layer/layer.js';

const App = () => {
    let dom = document.querySelector('#app');
    let layerModule = new layer();
    dom.innerHTML = layerModule.tpl({
        name: 'zero',
        arr: ['xiaoma', 'apple', 'hahahahaahha']
    });
    console.log(layerModule)
};

App();
