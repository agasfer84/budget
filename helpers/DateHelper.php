<?php

namespace app\helpers;

use Yii;
use DatePeriod;
use DateTime;
use DateInterval;

/**
 * Class DateHelper
 * @package helpers
 */
class DateHelper
{
    public static function nowDate()
    {
        return date('Y-m-d');
    }

    public static function nowDateYm()
    {
        return date('Y-m');
    }

    public static function nowMonthY()
    {
        $period = date('Y-m');
        Yii::$app->formatter->locale = 'ru-RU';
        return Yii::$app->Formatter->asDate($period, 'LLLL y');
    }

    public static function strToMonthY($period)
    {

        $timestamp = strtotime($period);
        $date = date('Y-m',$timestamp);
        Yii::$app->formatter->locale = 'ru-RU';
        return Yii::$app->Formatter->asDate($date, 'LLLL y');
    }


    public static function strToDate($str)
    {
        $timestamp = strtotime($str);
        return date('Y-m-d',$timestamp);
    }



}