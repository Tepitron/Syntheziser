#include "mainwindow.hh"
#include "ui_mainwindow.h"

MainWindow::MainWindow(QWidget *parent)
    : QMainWindow(parent)
    , ui(new Ui::MainWindow)
{
    resourceCounter = 0;
    MINRESNEXTSHOVEL = 20;
    MINRESNEXTWORKER = 50;
    shovelEfficiency = 1;
    basicShovel = false;
    betterShovel = false;
    ui->setupUi(this);
}

MainWindow::~MainWindow()
{
    delete ui;
}


void MainWindow::on_gatherButton_clicked()
{
    resourceCounter += shovelEfficiency;
    ui->gatheredLcdNumber->display(resourceCounter);

}
void MainWindow::on_gatheredLcdNumber_overflow()
{

}


void MainWindow::on_buyShovelButton_clicked()
{
    if (resourceCounter >= MINRESNEXTSHOVEL && !basicShovel){
        ui->buyShovelButton->setText("Even bigger Shovel ( Cost: 100 Resources)");
        ui->buyShovelButton->resize(350,50);
        updateShovelEfficiency();
        reduceResources(MINRESNEXTSHOVEL);
        raiseMinResNextShovel(100);
        basicShovel = true;
    }

    else if (resourceCounter >= MINRESNEXTSHOVEL && basicShovel && !betterShovel){
        ui->buyShovelButton->setText("Bought all");
        ui->buyShovelButton->resize(300,50);
        reduceResources(MINRESNEXTSHOVEL);
        updateShovelEfficiency();
    }
}

void MainWindow::raiseMinResNextShovel(int raiseTo){
    MINRESNEXTSHOVEL = raiseTo;
}

void MainWindow::updateShovelEfficiency(){
    shovelEfficiency *= 2;
    QString updatedLabelText = QString("Shovel efficiency : %1").arg(shovelEfficiency);
    ui->shovelEfficiencyLabel->setText(updatedLabelText);
}

void MainWindow::on_buyWorkerButton_clicked()
{
    if (resourceCounter >= MINRESNEXTWORKER){
        updateWorkerRequiredResource();
    }
}

void MainWindow::updateWorkerRequiredResource(){
    reduceResources(MINRESNEXTWORKER);
    MINRESNEXTWORKER *= 1.20;
    QString workersRequired =
            QString("Buy a Worker (Cost : %1 Resources)").arg(MINRESNEXTWORKER);
    ui->buyWorkerButton->setText(workersRequired);
}

void MainWindow::reduceResources(int reducable){
    resourceCounter -= reducable;
    ui->gatheredLcdNumber->display(resourceCounter);
}
