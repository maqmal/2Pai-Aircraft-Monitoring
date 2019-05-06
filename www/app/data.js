function RealTimeData() {
    const socket = io.connect();

    socket.on('socketData', (data) => {
        console.log(data);

        document.getElementById("DataRecive").innerHTML = data.dataHasil;

        $("#header").html(data.dataHasil[0]);
        $("#latitude").html(data.dataHasil[1]);
        $("#longitude").html(data.dataHasil[2]);
        $("#humidity").html(data.dataHasil[3]);
        $("#temperature").html(data.dataHasil[4]);
        $("#acc_x").html(data.dataHasil[5]);
        $("#acc_y").html(data.dataHasil[6]);
        $("#acc_z").html(data.dataHasil[7]);
        $("#gyro_x").html(data.dataHasil[8]);
        $("#gyro_y").html(data.dataHasil[9]);
        $("#gyro_z").html(data.dataHasil[10]);
    });
}
