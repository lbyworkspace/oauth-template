package com.lby.template.config.jpa;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;
import java.util.List;

/**
 * Author: laishao
 * Date: 2022/5/12
 */
@Converter
public class ListConvertJson implements AttributeConverter<List<String>,String> {

    @Override
    public String convertToDatabaseColumn(List<String> objects) {
        return objects == null ? null : JSONObject.toJSONString(objects);
    }

    @Override
    public List<String> convertToEntityAttribute(String s) {
        return JSONArray.parseArray(s,String.class);
    }
}
