package bs.backend.exception;

import java.util.HashMap;
import java.util.Map;

import com.alibaba.fastjson.JSONObject;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@ControllerAdvice
public class ResponseResult {

    static JSONObject jsonMsg(String msg,String state){
        JSONObject jsonObj = new JSONObject();
        jsonObj.put("state",state);
        jsonObj.put("message", msg);
        return jsonObj;
    }

    @ResponseBody
    public static ResponseEntity<String> success(){
        return ResponseEntity.status(200).body(jsonMsg("ok","success").toJSONString());
    }

    @ExceptionHandler(ErrorRequest.class)
    @ResponseBody
    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    public ResponseEntity userException(ErrorRequest e){    
        int statusCode = Integer.parseInt(e.getCode()); 
        String errorMessage = e.getMessage();
        return ResponseEntity.status(statusCode).body(jsonMsg(errorMessage,"error"));
    }

}
