package com.nju.server.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.module.SimpleModule;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;

import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;

import java.text.SimpleDateFormat;
import java.util.List;



@Configuration
public class WebMvcConfig implements WebMvcConfigurer {


    @Override
    public void addCorsMappings(CorsRegistry registry) {


        registry.addMapping("/**")
                // 设置允许跨域请求的域名
                .allowedOriginPatterns("*")
                // 放行全部请求类型
                .allowedMethods("*")
                // .allowedMethods("GET", "POST", "DELETE", "PUT")
                // 是否发送Cookie
                .allowCredentials(true)
                //暴露哪些头部信息
                .exposedHeaders("*");
    }
    /**
     * 使用此方法, 以下 spring-boot: jackson时间格式化 配置 将会失效
     * spring.jackson.time-zone=GMT+8
     * spring.jackson.date-format=yyyy-MM-dd HH:mm:ss
     * 原因: 会覆盖 @EnableAutoConfiguration 关于 WebMvcAutoConfiguration 的配置
     * */
    @Override
    public void extendMessageConverters(List<HttpMessageConverter<?>> converters) {
        MappingJackson2HttpMessageConverter converter = new MappingJackson2HttpMessageConverter();
        ObjectMapper objectMapper = converter.getObjectMapper();
        // 生成JSON时,将所有Long转换成String
        SimpleModule simpleModule = new SimpleModule();
        simpleModule.addSerializer(Long.class, ToStringSerializer.instance);
        simpleModule.addSerializer(Long.TYPE, ToStringSerializer.instance);
        objectMapper.registerModule(simpleModule);
        // 时间格式化
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        objectMapper.setDateFormat(new SimpleDateFormat(DateUtil.FULL_TIME_SPLIT_PATTERN));
        // 设置格式化内容
        converter.setObjectMapper(objectMapper);
        converters.add(0, converter);
    }

}
