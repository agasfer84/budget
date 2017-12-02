<?php
namespace app\models;

use yii\db\ActiveRecord;
use Yii;
use yii\db\Connection;


class Authorization extends ActiveRecord
{

    const TABLE_NAME = '{{users}}';
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

    public static function getAuth($model)
    {
        $user = false;
        $checkpass = false;
        $user = self::find()->where(["login"=>$model["login"]])->andWhere(["status"=>1])->one();
        if($model["hash"]&&$user->hash&&$user->hash == $model["hash"]){return true;}
        if($user->password){$checkpass = Yii::$app->getSecurity()->validatePassword($model["password"], $user->password);}
        if($checkpass){
            $time = time();
            $hash = Yii::$app->getSecurity()->generatePasswordHash($time);
            $user->hash = $hash;
            $user->save();
            return $hash;
        }
        return false;
    }

    public static function findUseridByUser($user)
    {
        $userid = self::find()->where(["login"=>$user])->andWhere(["status"=>1])->one()["id"];
        return $userid;
    }
}