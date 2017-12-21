<?php


namespace app\models;

use yii\db\ActiveRecord;
use Yii;
use yii\db\Connection;
use app\helpers\DateHelper;

use app\models\Records;


class Statistica extends \yii\db\ActiveRecord
{

    const TABLE_NAME = '{{records}}';
    const DB_NAME = 'db10';

    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return self::TABLE_NAME;
    }

    /**
     * @inheritdoc
     */

    public static function getDb()
    {
        return Yii::$app->get(self::DB_NAME);
    }

    public function Bottomstat($period)
    {
        if(!$period)
        {
            $year = date('Y');
            $month = date('m');
        }
        else {
            $year = substr($period,0, 4);
            $month = substr($period, -2);
        }
        $monthdebet = self::find()->where(['section' => 'debet'])->andWhere(['=',"YEAR(date)", $year])->andWhere(['=',"MONTH(date)", $month])->sum('summa');
        if(!$monthdebet){$monthdebet=0;}
        $monthcredit = self::find()->where(['section' => 'credit'])->andWhere(['=',"YEAR(date)", $year])->andWhere(['=',"MONTH(date)", $month])->sum('summa');
        if(!$monthcredit){$monthcredit=0;}
        $monthsaldo  = $monthdebet-$monthcredit;
        $monthsaldo  = round($monthsaldo, 2);
        $botomstatarr = ["monthdebet" => $monthdebet, "monthcredit" => $monthcredit, "monthsaldo" => $monthsaldo];
        return $botomstatarr;

    }

    public function Bottomitog()
    {

        $alldebet = self::find()->where(['section' => 'debet'])->sum('summa');
        if(!$alldebet){$alldebet=0;}
        $allcredit = self::find()->where(['section' => 'credit'])->sum('summa');
        if(!$allcredit){$allcredit=0;}
        $allsaldo  = $alldebet-$allcredit;
        $botomitog = ["alldebet" => $alldebet, "allcredit" => $allcredit, "allsaldo" => $allsaldo];
        return $botomitog;

    }

    public function getGrouped()
    {

        $connection = Yii::$app->db10;

        $periods = self::getPeriods();

        $qrouped=[];
        $i=0;

        foreach ($periods as $period) {

            $month = substr($period["ym"], 4, 2);
            $year = substr($period["ym"], 0, 4);

            $qrouped[$i]["date"] = DateHelper::strToMonthY($year."-".$month);

            $qrouped[$i]["debet"] = $connection->createCommand("SELECT r.type, sum(r.summa) as sum, t.typename FROM records r INNER JOIN types t on t.typecode=r.type WHERE r.section='debet' AND YEAR(r.date)=$year AND MONTH(r.date)=$month GROUP BY r.type ORDER BY sum DESC")->queryAll();

            $qrouped[$i]["credit"] = $connection->createCommand("SELECT r.type, sum(r.summa) as sum, t.typename FROM records r INNER JOIN types t on t.typecode=r.type WHERE r.section='credit' AND YEAR(r.date)=$year AND MONTH(r.date)=$month GROUP BY r.type ORDER BY sum DESC")->queryAll();

            $qrouped[$i]["itogo"] = self::Bottomstat($year.$month);

            $i++;

        }

        return $qrouped;

    }

    public function getAllItog()
    {

        $connection = Yii::$app->db10;

        $periods = self::getPeriods();

        $lastperiod = $periods[0];
        $firstperiod = end($periods); //because desc sort

        $all[0]["debet"] = $connection->createCommand("SELECT r.type, sum(r.summa) as sum, t.typename, (SELECT sum(summa) FROM records WHERE section='debet') as total_sum FROM records r INNER JOIN types t on t.typecode=r.type WHERE r.section='debet' GROUP BY r.type ORDER BY sum DESC")->queryAll();

        $all[0]["credit"] = $connection->createCommand("SELECT r.type, sum(r.summa) as sum, t.typename, (SELECT sum(summa) FROM records WHERE section='credit') as total_sum FROM records r INNER JOIN types t on t.typecode=r.type WHERE r.section='credit' GROUP BY r.type ORDER BY sum DESC")->queryAll();

        $all[0]["itogo"] = self::Bottomitog();

        $all[0]["firstperiod"] = DateHelper::strToMonthY(substr($firstperiod["ym"],0,4)."-".substr($firstperiod["ym"], 4, 2));
        $all[0]["lastperiod"] = DateHelper::strToMonthY(substr($lastperiod["ym"],0,4)."-".substr($lastperiod["ym"], 4, 2));

        return $all;

    }

    public function getPeriods() {

        $periods = self::find()->select("EXTRACT( YEAR_MONTH FROM `date` ) as ym")->distinct()->orderBy("date DESC")->asArray()->all();
        return $periods;

    }



}