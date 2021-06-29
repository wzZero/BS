package bs.backend.exception;

public enum ErrorEnum implements ErrorInterface{
    USER_NOT_FOUND("200","user not found"),
    USER_ERROR_PASSWORD("200","wrong password"),
    USER_SAME_EMAIL("200","email already have register"),
    
    DEVICE_ONLINE_ERROR("200","can't get online info"),
    DEVICE_CREATE_ERROR("200","name and type required!"),
    DEVICE_NOT_FOUND("200","device not found"),
    DEVICE_ATTR_ERROR("200","should have deviceName");

    private String resultCode;
    private String resultMsg;

    ErrorEnum(String resultCode,String resultMsg){
        this.resultCode = resultCode;
        this.resultMsg = resultMsg;
    }

    @Override
    public String getResultCode() {
        return resultCode;
    }

    @Override
    public String getResultMessage() {
        return resultMsg;
    }

}
