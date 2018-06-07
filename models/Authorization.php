<?php
namespace app\models;

use yii\db\ActiveRecord;
use Yii;
use yii\db\Connection;


class Authorization extends ActiveRecord
{

    const TABLE_NAME = '{{users}}';
    const DB_NAME = 'db10';

    private $_user = false;

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

    public function getAuth($model)
    {
        $user = false;
        $checkpass = false;
        if(isset($model["hash"])){$user = self::find()->where(["hash"=>$model["hash"]])->andWhere(["status"=>1])->one();}
        if(isset($model["hash"])&&$user->hash&&$user->hash == $model["hash"]){
            Yii::$app->user->login($this->getUser($user->login));
            return true;
        }
        if(isset($model["login"])){$user = self::find()->where(["login"=>$model["login"]])->andWhere(["status"=>1])->one();}
        if($user->password){$checkpass = Yii::$app->getSecurity()->validatePassword($model["password"], $user->password);}
        if($checkpass){
            $time = time();
            $hash = Yii::$app->getSecurity()->generatePasswordHash($time);
            $user->hash = $hash;
            Yii::$app->user->login($this->getUser($user->login));
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

    public static function getUsers()
    {
        return self::find()->asArray()->all();
    }

    public static function getUserById($id)
    {
        return self::find()->where(["id"=>$id])->one();
    }

    public function getUser($username)
    {
        if ($this->_user === false) {
            $this->_user = User::findByUsername($username);
        }

        return $this->_user;
    }

}