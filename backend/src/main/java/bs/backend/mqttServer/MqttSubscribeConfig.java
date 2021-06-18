package bs.backend.mqttServer;

import org.eclipse.paho.client.mqttv3.MqttConnectOptions;
import org.eclipse.paho.client.mqttv3.internal.wire.MqttConnect;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.integration.annotation.IntegrationComponentScan;
import org.springframework.integration.annotation.ServiceActivator;
import org.springframework.integration.channel.DirectChannel;
import org.springframework.integration.core.MessageProducer;
import org.springframework.integration.mqtt.core.DefaultMqttPahoClientFactory;
import org.springframework.integration.mqtt.core.MqttPahoClientFactory;
import org.springframework.integration.mqtt.inbound.MqttPahoMessageDrivenChannelAdapter;
import org.springframework.integration.mqtt.support.DefaultPahoMessageConverter;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.MessageHandler;
import org.springframework.messaging.MessagingException;

import java.nio.charset.StandardCharsets;
import java.util.Objects;

@Configuration
@PropertySource("classpath:application.properties")
@IntegrationComponentScan
public class MqttSubscribeConfig {
    // subscribe name
    public static final String CHANNEL_NAME = "mqttInboundChannel";
    // last message
    private static final byte[] WILL_DATA;
    static {
        WILL_DATA = "offline".getBytes(StandardCharsets.UTF_8);
    }

    @Value("${spring.mqtt.url}")
    private String brokerUrl;
    
    @Value("${spring.mqtt.username}")
    private String username = "server";
    
    @Value("${spring.mqtt.password}")
    private String password = "123456";
    
    @Value("${spring.mqtt.consumer.clientId}")
    private String clientId;
    
    @Value("${spring.mqtt.consumer.topic}")
    private String topic;
    
    @Bean
    public MqttConnectOptions getMqttConnectOptions(){
        MqttConnectOptions mqttConnectOptions = new MqttConnectOptions();
        mqttConnectOptions.setUserName(username);
        mqttConnectOptions.setPassword(password.toCharArray());
        mqttConnectOptions.setServerURIs(new String[]{brokerUrl});
        mqttConnectOptions.setConnectionTimeout(10);
        mqttConnectOptions.setKeepAliveInterval(30);    // judge if the client is online
        return mqttConnectOptions;
    }
    
    @Bean
    public MqttPahoClientFactory mqttPahoClientFactory(){
        DefaultMqttPahoClientFactory factory = new DefaultMqttPahoClientFactory();
        factory.setConnectionOptions(getMqttConnectOptions());
        return factory;
    }

    @Bean(name=CHANNEL_NAME)
    public MessageChannel mqttInboundChannel(){
        return new DirectChannel();
    }

    @Bean
    public MessageProducer inbound(){
        MqttPahoMessageDrivenChannelAdapter adapter = new MqttPahoMessageDrivenChannelAdapter(clientId,mqttPahoClientFactory(), topic);
        adapter.setCompletionTimeout(5000);
        adapter.setConverter(new DefaultPahoMessageConverter());
        adapter.setQos(1);  // service quality
        adapter.setOutputChannel(mqttInboundChannel());
        return adapter;
    }

    @Bean
    @ServiceActivator(inputChannel = CHANNEL_NAME)
    public MessageHandler handler(){
        return new MessageHandler() {
            @Override
            public void handleMessage(Message<?> message) throws MessagingException {
                System.out.println("topic:"+topic);
//                String topicRecord =  Objects.requireNonNull(message.getHeaders().get("record")).toString();
                String msg = message.getPayload().toString();
                System.out.println(msg);
            }
        };
    }
}
