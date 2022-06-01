#include<unistd.h>
#include<stdio.h>
int main(){
int x;
int n=1;
printf("Introduzca el número de veces a repetir el mensaje:");
scanf("%d",&x);
if (x<=0){
return 0;
}
else{
do{
printf("%d.-Hola Beagle!\n",n);
sleep(2);
}while(n++<x);
}
return 0;
}
