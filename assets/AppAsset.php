<?php
/**
 * @link http://www.yiiframework.com/
 * @copyright Copyright (c) 2008 Yii Software LLC
 * @license http://www.yiiframework.com/license/
 */

namespace app\assets;

use yii\web\AssetBundle;

/**
 * Main application asset bundle.
 *
 * @author Qiang Xue <qiang.xue@gmail.com>
 * @since 2.0
 */
class AppAsset extends AssetBundle
{
    public $basePath = '@webroot';
    public $baseUrl = '@web';
    public $css = [
        'budget-app/node_modules/@angular/material/prebuilt-themes/indigo-pink.css',
        'budget-app/src/app/styles/whhg-font/css/whhg.css',
        'budget-app/src/app/styles/app.component.css',
        'budget-app/dist/styles.bundle.css',
    ];
    public $js = [
        //'budget-app/dist/polyfills.js',
        //'budget-app/dist/vendor.js',
        //'budget-app/dist/app.js',
        'budget-app/dist/inline.bundle.js',
        'budget-app/dist/polyfills.bundle.js',
        'budget-app/dist/vendor.bundle.js',
        'budget-app/dist/main.bundle.js',
    ];
    public $depends = [
        'yii\web\YiiAsset',
        'yii\bootstrap\BootstrapAsset',
    ];
}
