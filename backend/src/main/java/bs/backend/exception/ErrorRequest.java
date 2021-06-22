package bs.backend.exception;

public class ErrorRequest extends RuntimeException {
    static final long serialVersionUID = 1L;

    protected String errorCode;
    protected String errorMsg;

    public ErrorRequest(ErrorInterface errorInterface){
        super(errorInterface.getResultCode());
        this.errorCode = errorInterface.getResultCode();
        this.errorMsg = errorInterface.getResultMessage();
    }

    public ErrorRequest(String resultCode,String resultMessage){
        super(resultCode);
        this.errorCode = resultCode;
        this.errorMsg = resultMessage;
    }

    public String getCode() {
		return errorCode;
	}

	public void setCode(String code) {
		this.errorCode = code;
	}

	public String getMessage() {
		return errorMsg;
	}

	public void setMessage(String message) {
		this.errorMsg = message;
	}
}
