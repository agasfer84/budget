<?php
return [
    'class' => 'yii\web\UrlManager',
    'enablePrettyUrl' => true,
    'showScriptName' => false,
    'enableStrictParsing' => true,
    'suffix' => '',
    'rules' => [
        ['pattern' => '', 'route' => 'budget/default/index'],
        ['pattern' => 'csp-report', 'route' => 'site/csp-report'],


        ['pattern' => '<controller:\w+>/\/{0,1}', 'route' => 'budget/default/index'],
        ['pattern' => '<controller:\w+>/<action:[\w\-]+>/<id:\d+>', 'route' => 'budget/default/<action>'],
        ['pattern' => '<controller:\w+>/<action:[\w\-]+>', 'route' => 'budget/default/<action>'],

    ]
];