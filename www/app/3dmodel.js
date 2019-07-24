var param = {
    acc_x: 0,
    acc_y: 0,
    acc_z: 0,
    gyro_x: 0,
    gyro_y: 0,
    gyro_z: 0,

    setAcc_X: function (data) {
        this.acc_x = parseFloat(data);
    },
    setAcc_Y: function (data) {
        this.acc_y = parseFloat(data);
    },
    setAcc_Z: function (data) {
        this.acc_z = parseFloat(data);
    },
    getAcc_X: function () {
        return this.acc_x;
    },
    getAcc_Y: function () {
        return this.acc_y;
    },
    getAcc_Z: function () {
        return this.acc_z;
    },

    setGyro_X: function (data) {
        this.gyro_x = parseFloat(data);
    },
    setGyro_Y: function (data) {
        this.gyro_y = parseFloat(data);
    },
    setGyro_Z: function (data) {
        this.gyro_z = parseFloat(data);
    },
    getGyro_X: function () {
        return this.gyro_x;
    },
    getGyro_Y: function () {
        return this.gyro_y;
    },
    getGyro_Z: function () {
        return this.gyro_z;
    }
}

function TdModel() {
    const socket = io.connect();
    socket.on('data3d', (data) => {
        param.setAcc_X(data.dataHasil[5]);
        param.setAcc_Y(data.dataHasil[6]);
        param.setAcc_Z(data.dataHasil[7]);

        param.setGyro_X(data.dataHasil[8]);
        param.setGyro_Y(data.dataHasil[9]);
        param.setGyro_Z(data.dataHasil[10])

    });
}
