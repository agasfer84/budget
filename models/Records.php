<?php

namespace app\models;

use yii\db\ActiveRecord;
use Yii;
use yii\db\Connection;
use app\helpers\DateHelper;
use yii\behaviors\TimestampBehavior;
use app\models\Authorization;


class Records extends ActiveRecord
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

    public function behaviors()
    {
        return [
            'timestamp' => [
                'class' => TimestampBehavior::className(),
                'createdAtAttribute' => 'created_at',
                'updatedAtAttribute' => 'edited_at'
            ]
        ];
    }

    /**
     * @inheritdoc
     */

    public static function getDb()
    {
        return Yii::$app->get(self::DB_NAME);
    }

    public function rules()
    {
        return [
            [['section', 'type', 'summa', 'date', 'comment', 'userid'], 'safe'],
            [['section', 'type', 'summa', 'date'], 'required'],
        ];
    }

    public function fields() { return ['section', 'type', 'summa', 'date', 'comment'];}

    public function createRecord()
    {
        $this->load(Yii::$app->getRequest()->getBodyParams(), '');
        $section = Yii::$app->request->post('section');
        $type = Yii::$app->request->post('type');
        $summa = Yii::$app->request->post('summa');
        $datemd = Yii::$app->request->post('date');
        $date = date('Y').$datemd;
        $comment = Yii::$app->request->post('commentary');
        $user = Yii::$app->request->post('user');
        $userid = Authorization::findUseridByUser($user);

        $this->section = $section;
        $this->type = $type;
        $this->summa = floatval($summa);

        if($date) {$this->date = DateHelper::strToDate($date);}
        else {$this->date = DateHelper::nowDate();}

        $this->comment = $comment;
        $this->userid = $userid;

        if($this->save()) {return true;}
        else{return false;}

        //return false;


    }

    public function getRecords()
    {
        return self::find()->select(["records.*", "types.typename", "users.login"])->leftJoin("types",  "types.typecode = records.type")
            ->leftJoin("users",  "users.id = records.userid")
            ->orderBy("id DESC")->limit(30)->asArray()->all();
    }

    public static function removeRecord($id)
    {
        $id=(int)$id;
      $record = self::find()->where(["id"=>$id])->one();
        if($record->delete()){return true;}
        return false;
    }



}