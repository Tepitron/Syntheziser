#ifndef MAINWINDOW_HH
#define MAINWINDOW_HH

#include <QMainWindow>


QT_BEGIN_NAMESPACE
namespace Ui { class MainWindow; }
QT_END_NAMESPACE

class MainWindow : public QMainWindow
{
    Q_OBJECT

public:
    MainWindow(QWidget *parent = nullptr);
    ~MainWindow();

private slots:
    void on_gatherButton_clicked();

    void on_gatheredLcdNumber_overflow();

    void on_buyShovelButton_clicked();

    void on_buyWorkerButton_clicked();

private:
    Ui::MainWindow *ui;
    int resourceCounter;
    int shovelEfficiency;
    int MINRESNEXTSHOVEL;
    int MINRESNEXTWORKER;
    int workerEfficiency;
    bool basicShovel;
    bool betterShovel;
    int timerId;

    void raiseMinResNextShovel(int raiseTo);
    void updateShovelEfficiency();
    void updateWorkerRequiredResource();
    void reduceResources(int reducable);
    void updateWorkerEfficiency();

protected:
    void timerEvent(QTimerEvent *event);
};
#endif // MAINWINDOW_HH
