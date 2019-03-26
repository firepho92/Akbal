create table if not exists Cargos(
	id_cargo int not null auto_increment,
	cargo varchar(50),
	primary key(id_cargo)
);

create table if not exists Gastos(
	id_gasto int not null auto_increment,
	monto float,
	descripcion varchar(140),
	fecha varchar(50),
	primary key(id_gasto)
);

create table if not exists Categorias(
	id_categoria int not null auto_increment,
	categoria varchar(50),
	primary key(id_categoria)
);

create table if not exists Empleados(
	id_empleado int not null auto_increment,
	nombre varchar(120),
	telefono varchar(10),
	primary key(id_empleado)
);

create table if not exists Caja(
	id_caja int not null auto_increment,
	fecha varchar(50),
	monto float,
	primary key(id_caja)
);

create table if not exists Administradores(
	id_administrador int not null auto_increment,
	usuario varchar(20),
	password varchar(20),
	primary key(id_administrador)
);

create table if not exists Productos(
	id_producto int not null auto_increment,
	producto varchar(50),
	stock int,
	descripcion varchar(140),
	precio_produccion float,
	precio_venta float,
	categoria int,
	primary key(id_producto),
	foreign key(categoria) references Categorias(id_categoria)
);

create table if not exists Ventas(
	id_venta int not null auto_increment,
	ticket varchar(50),
	producto int,
	empleado int,
	fecha varchar(50),
	caja int,
	primary key(id_venta),
	foreign key(producto) references Productos(id_producto),
	foreign key(empleado) references Empleados(id_empleado),
	foreign key(caja) references Caja(id_caja)
);
