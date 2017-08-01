import './layer.less';
import tpl from './layer.ejs';

function layer () {
    return {
        name: 'layer',
        tpl: tpl
    };
}

export default layer;
