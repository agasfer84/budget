<?php
namespace app\controllers\budget;
use Yii;
use yii\base\InvalidParamException;
use yii\web\BadRequestHttpException;
use yii\web\Controller;
use yii\filters\VerbFilter;
use yii\filters\AccessControl;
use yii\web\Response;

use app\helpers\DateHelper;

use app\models\Records;
use app\models\Types;
use app\models\Statistica;
use app\models\Authorization;

/**
 * Default controller
 */
class DefaultController extends Controller
{
    /**
     * @inheritdoc
     */
    public function behaviors()
    {
        return [
            'access' => [
                'class' => AccessControl::className(),
                'only' => ['logout', 'login'],
                'rules' => [
                    [
                        'actions' => ['login'],
                        'allow' => true,
                        'roles' => ['?'],
                    ],
                    [
                        'actions' => ['logout'],
                        'allow' => true,
                        'roles' => ['@'],
                    ],
                ],
            ],
            'verbs' => [
                'class' => VerbFilter::className(),
                'actions' => [
                    'logout' => ['post'],
                    'index' => ['get'],
                    'test' => ['get'],
                ],
            ],
        ];
    }

    /**
     * @inheritdoc
     */
    public function actions()
    {
        return [
            'error' => [
                'class' => 'yii\web\ErrorAction',
            ],
            'captcha' => [
                'class' => 'yii\captcha\CaptchaAction',
                'fixedVerifyCode' => YII_ENV_TEST ? 'testme' : null,
            ],
        ];
    }

    /**
     * Displays homepage.
     *
     * @return mixed
     */
    public function actionIndex()
    {

        //Yii::$app->response->format = Response::FORMAT_JSON;
        //return "test";
        return $this->render('index');
    }

    public function actionAuth()
    {
        Yii::$app->response->format = Response::FORMAT_JSON;
        if(Yii::$app->request->method === 'POST') {
            $model = Yii::$app->getRequest()->getBodyParams();
            return Authorization::getAuth($model);
        }
        return false;
    }

    public function actionGetdate()
    {
        Yii::$app->response->format = Response::FORMAT_JSON;
        return DateHelper::nowDate();
    }

    public function actionGetmonth()
    {
        Yii::$app->response->format = Response::FORMAT_JSON;
        return DateHelper::nowMonthY();
    }

    public function actionGettypes($section)
    {
        Yii::$app->response->format = Response::FORMAT_JSON;
        $Types = new Types();
        return $Types->getTypes($section);

    }

    public function actionGetbottomstat()
    {
        $Statistica = new Statistica();
        if(Yii::$app->request->method === 'GET') {
            Yii::$app->response->format = Response::FORMAT_JSON;
            return $Statistica->Bottomstat($period=false);
        }
        return false;
    }

    public function actionRecorddata()
    {
        $record = new Records();
        if(Yii::$app->request->method === 'POST') {
            Yii::$app->response->format = Response::FORMAT_JSON;
            if($record->createRecord()){
                $messages = [["Запись внесена"], ["success"]];
            }
            else {
                $messages = [["Ошибка записи"], ["error"]];

            }

            return $messages;
        }

        return false;
    }

    public function actionRemove()
    {
        if(Yii::$app->request->method === 'POST') {
            Yii::$app->response->format = Response::FORMAT_JSON;
            $model = Yii::$app->getRequest()->getBodyParams();
            return Records::removeRecord($model["id"]);
        }
        return false;
    }

    public function actionStat()
    {

        Yii::$app->response->format = Response::FORMAT_JSON;

        $Statistica = new Statistica();
        return $Statistica->getGrouped();

    }

    public function actionAllstat()
    {

        Yii::$app->response->format = Response::FORMAT_JSON;

        $Statistica = new Statistica();
        return $Statistica->getAllItog();

    }

    public function actionTop()
    {

        Yii::$app->response->format = Response::FORMAT_JSON;

        $records = new Records();
        return $records->getRecords();

    }

    public function actionTest()
    {
        Yii::$app->response->format = Response::FORMAT_JSON;

        $Statistica = new Statistica();
        //return DateHelper::nowDateYm();
        return $Statistica->getPeriods();
    }
}