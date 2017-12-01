<?php


namespace app\models;

use yii\db\ActiveRecord;
use Yii;
use yii\db\Connection;
use app\helpers\DateHelper;
use yii\behaviors\TimestampBehavior;


class Types extends ActiveRecord
{

    const TABLE_NAME = '{{types}}';
    const DB_NAME = 'db10';

    /**
     * @inheritdoc
     */

    public static function getDb()
    {
        return Yii::$app->get(self::DB_NAME);
    }

    public function getTypes($section)
    {
        $types = self::find()->where(['section' => $section])->asArray()->all();

        return $types;
    }

    public function getType($typecode)
    {

        $type = self::find()->where(['typecode' => $typecode])->one();

        return $type;

    }

}