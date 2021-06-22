package bs.backend.exception;

import com.alibaba.fastjson.JSONObject;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

@ControllerAdvice
public class ResponseResult {

    static String jsonMsg(String msg){
        JSONObject jsonObj = new JSONObject();
        jsonObj.put("message", msg);
        return jsonObj.toJSONString();
    }

    @ResponseBody
    public static ResponseEntity<String> success(){
        return ResponseEntity.status(200).body(jsonMsg("ok"));
    }

    @ExceptionHandler(ErrorRequest.class)
    @ResponseBody
    public ResponseEntity<String> userException(ErrorRequest e){    
        int statusCode = Integer.parseInt(e.getCode()); 
        String errorMessage = e.getMessage();
        return ResponseEntity.status(statusCode).body(jsonMsg(errorMessage));
    }

}
