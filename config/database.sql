CREATE TABLE `USUARIOS`(
    `id_usuario` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `id_rol` INT NOT NULL,
    `nombre` VARCHAR(255) NOT NULL,
    `apellido` VARCHAR(255) NOT NULL,
    `tipo_documento` ENUM('CC', 'TI', 'PT', 'OTROS') NOT NULL DEFAULT 'CC',
    `n_documento` VARCHAR(255) NOT NULL,
    `n_telefono` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `usuario` VARCHAR(255) NOT NULL,
    `contrasena` VARCHAR(255) NOT NULL,
    `fecha_creacion` TIMESTAMP NOT NULL,
    `fecha_actualizacion` TIMESTAMP NOT NULL,
    `fecha_eliminacion` TIMESTAMP NOT NULL
);
CREATE TABLE `ROLES`(
    `id_rol` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `nombre_rol` VARCHAR(255) NOT NULL,
    `descripcion` VARCHAR(255) NOT NULL,
    `fecha_creacion` TIMESTAMP NOT NULL,
    `fecha_actualizacion` TIMESTAMP NOT NULL,
    `fecha_eliminacion` TIMESTAMP NOT NULL
);
CREATE TABLE `PROVEDORES`(
    `id_provedor` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `nombre_provedor` VARCHAR(255) NOT NULL,
    `responsabilidad_tributaria` ENUM(
        'Persona Natural',
        'Persona Jurídica'
    ) NOT NULL,
    `nit_tipo de documento` ENUM('NIT', 'CC', 'PT', 'TI', 'OTROS') NOT NULL,
    `numero_documento` VARCHAR(255) NOT NULL,
    `descripcion` TEXT NOT NULL,
    `creado_por` INT NOT NULL,
    `fecha_creacion` TIMESTAMP NOT NULL,
    `actualizado_por` INT NOT NULL,
    `fecha_actualizacion` TIMESTAMP NOT NULL,
    `eliminado_por` INT NOT NULL,
    `fecha_eliminacion` TIMESTAMP NOT NULL
);
CREATE TABLE `ARTICULOS`(
    `id_articulo` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `nombre_articulo` VARCHAR(255) NOT NULL,
    `unidad` INT NOT NULL,
    `precio_articulo` VARCHAR(255) NOT NULL,
    `descripcion` VARCHAR(255) NOT NULL,
    `creado_por` INT NOT NULL,
    `fecha_creacion` TIMESTAMP NOT NULL,
    `actualizado_por` INT NOT NULL,
    `fecha_actualizacion` TIMESTAMP NOT NULL,
    `eliminado_por` INT NOT NULL,
    `fecha_eliminacion` TIMESTAMP NOT NULL,
    `new_column` BIGINT NOT NULL
);
CREATE TABLE `COMPRAS`(
    `id_compra` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `id_articulo` INT NOT NULL,
    `id_proveedores` INT NOT NULL,
    `creado_por` INT NOT NULL,
    `fecha_creeacion` TIMESTAMP NOT NULL,
    `actualizado_por` INT NOT NULL,
    `fecha_actualizacion` TIMESTAMP NOT NULL,
    `eliminado_por` INT NOT NULL,
    `fecha_eliminacion` TIMESTAMP NOT NULL
);
CREATE TABLE `VENTAS`(
    `id_venta` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `fecha_venta` TIMESTAMP NOT NULL,
    `total` VARCHAR(255) NOT NULL,
    `forma_pago` ENUM(
        'EFECTIVO',
        'TARJETA DEBITO',
        'TARJETA CREDITO',
        'NEQUI',
        'OTROS'
    ) NOT NULL
);
CREATE TABLE `INTENTOS_DE_LOGIN`(
    `id_intento` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `id_usuario` INT NOT NULL,
    `direccion_ip` VARCHAR(255) NOT NULL,
    `fecha_hora` DATETIME NOT NULL,
    `exito` TINYINT NOT NULL
);
CREATE TABLE `MODULOS`(
    `id_modulo` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `nombre_modulo` VARCHAR(255) NOT NULL,
    `descripcion` TEXT NOT NULL,
    `clave` VARCHAR(255) NOT NULL,
    `creado_por` INT NOT NULL,
    `fecha_creacion` TIMESTAMP NOT NULL,
    `actualizado_por` INT NOT NULL,
    `fecha_actualizacion` TIMESTAMP NOT NULL,
    `eliminado_por` INT NOT NULL,
    `fecha_eliminacion` TIMESTAMP NOT NULL
);
CREATE TABLE `OPCIONES`(
    `id_opcion` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `nombre_opcion` VARCHAR(255) NOT NULL,
    `descripcion` TEXT NOT NULL,
    `clave` VARCHAR(255) NOT NULL,
    `creado_por` INT NOT NULL,
    `fecha_creacion` TIMESTAMP NOT NULL,
    `actualizado_por` INT NOT NULL,
    `fecha_actualizacion` TIMESTAMP NOT NULL,
    `eliminado_por` INT NOT NULL,
    `fecha_eliminacion` TIMESTAMP NOT NULL
);
CREATE TABLE `PERMISOS`(
    `id_permiso` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `nombre_permiso` VARCHAR(255) NOT NULL,
    `descripcion` TEXT NOT NULL,
    `clave` VARCHAR(255) NOT NULL,
    `creado_por` INT NOT NULL,
    `fecha_creacion` TIMESTAMP NOT NULL,
    `actualizado_por` INT NOT NULL,
    `fecha_actualizacion` TIMESTAMP NOT NULL,
    `eliminado_por` INT NOT NULL,
    `fecha_eliminacion` TIMESTAMP NOT NULL
);
CREATE TABLE `DETALLE_DE_VENTA`(
    `id_detalle` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `id_articulo` INT NOT NULL,
    `id_venta` INT NOT NULL,
    `cantidad` INT NOT NULL,
    `precio_unitario` DECIMAL(8, 2) NOT NULL,
    `sub_total` DECIMAL(8, 2) NOT NULL,
    `total` DECIMAL(8, 2) NOT NULL,
    `creado_por` INT NOT NULL,
    `fecha_creacion` TIMESTAMP NOT NULL,
    `actualizado_por` INT NOT NULL,
    `fecha_actualizacion` TIMESTAMP NOT NULL,
    `eliminado_por` INT NOT NULL,
    `fecha_eliminacion` TIMESTAMP NOT NULL
);
CREATE TABLE `ROL_PERMISO_MODULO_OPCION`(
    `id_rol` INT UNSIGNED NOT NULL,
    `id_modulo` INT UNSIGNED NOT NULL,
    `id_opcion` INT UNSIGNED NOT NULL,
    `id_permiso` INT UNSIGNED NOT NULL,
    `creado_por` INT UNSIGNED NULL,
    `fecha_creacion` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP(),
    `actualizado_por` INT UNSIGNED NULL,
    `fecha_actualizacion` TIMESTAMP NULL,
    `eliminado_por` INT UNSIGNED NULL,
    `fecha_eliminacion` TIMESTAMP NULL,
    PRIMARY KEY(`id_rol`, `id_modulo`, `id_opcion`, `id_permiso`)
);

CREATE TABLE `tokens` (
    `id_token` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `id_usuario` INT UNSIGNED NOT NULL,
    `token` VARCHAR(10) NOT NULL,
    `expira` DATETIME NOT NULL,
    `usado` TINYINT(1) DEFAULT 0,
    `creado_en` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`id_usuario`) REFERENCES `usuarios`(`id_usuario`)
        ON DELETE CASCADE
) ENGINE=InnoDB;

