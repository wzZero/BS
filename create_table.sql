create database BS;

create table User (
uid int unsigned auto_increment,
username varchar(20) not null,
email varchar(50) not null unique,
password varchar(50) not null,
primary key (uid)
)engine=InnoDB default charset=utf8;

create table Device(
devid int unsigned auto_increment,
device_name varchar(50) not null,
device_type varchar(50) not null,
uid int unsigned,
primary key (devid)
);

create table Record(
recid int unsigned auto_increment,
lng double,
lat double,
value int,
moment timestamp,
alert tinyint,
info varchar(100),
devid int unsigned,
primary key (recid)
);