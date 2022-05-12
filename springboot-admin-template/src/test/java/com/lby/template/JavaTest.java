package com.lby.template;

import com.lby.template.enums.RoleEnum;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

import java.util.Arrays;

/**
 * Author: laishao
 * Date: 2022/5/12
 */
@RunWith(JUnit4.class)
public class JavaTest {

    @Test
    public void test1(){
        System.out.println(Arrays.asList(RoleEnum.ADMIN.getName(),RoleEnum.USER.getName()));
    }

}
