package com.issuetracker.web;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
import java.io.FileInputStream;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

class ImageControllerTest extends BaseControllerTest {

    @Test
    @Transactional
    @DisplayName("이미지 업로드 테스트")
    void upload() throws Exception {
        File folder = new ClassPathResource("image").getFile();
        String listOfFile = folder.listFiles()[0].getAbsolutePath();
        final MockMultipartFile multipartFile = new MockMultipartFile("image", "test-image.png", "image/png", new FileInputStream(listOfFile));
        String url = "http://localhost:" + port + "/api/images";
        mockMvc.perform(multipart(url)
                .file(multipartFile))
                .andDo(print())
                .andExpect(status().isOk());
    }
}
