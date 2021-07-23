package com.issuetracker.web;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.issuetracker.domain.label.Color;
import com.issuetracker.domain.label.Label;
import com.issuetracker.domain.label.LabelRepository;
import com.issuetracker.exception.LabelNotFoundException;
import com.issuetracker.web.dto.response.LabelDTO;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.transaction.annotation.Transactional;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

class LabelControllerTest extends BaseControllerTest {

    @Autowired
    private LabelRepository labelRepository;

    @Test
    @DisplayName("라벨 전체 조회")
    void read() throws Exception {
        String url = "http://localhost:" + port + "/api/labels";
        mockMvc.perform(get(url)
                .contentType(MediaType.APPLICATION_JSON)
                .header("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJcImlzc3VlLXRyYWNrZXItdGVhbS0wNlwiIiwidXNlcklkIjoxfQ.WCMSnjyZCjZ80aSBN9GCNckS8Q_FkdpWXPWJwsx3kVA"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.labelsCount").value(3))
                .andExpect(jsonPath("$.milestonesCount").value(3))
                .andExpect(jsonPath("$.labels[0].id").value(1))
                .andExpect(jsonPath("$.labels[0].name").value("bug"))
                .andExpect(jsonPath("$.labels[0].color.backgroundColorCode").value("#F47378"))
                .andExpect(jsonPath("$.labels[0].color.textColorCode").value("#000000"))
                .andExpect(jsonPath("$.labels[0].description").value("bug fix"))
                .andExpect(jsonPath("$.labels[0].checked").value(false));
    }

    @Test
    @Transactional
    @DisplayName("라벨 생성")
    void create() throws Exception {
        String name = "enhancement";
        String description = "기능 향상";
        Color color = new Color("#96F879", "#96F879");
        LabelDTO labelDTO = new LabelDTO(4L, name, color, description, false);
        String url = "http://localhost:" + port + "/api/labels";
        mockMvc.perform(post(url)
                .contentType(MediaType.APPLICATION_JSON)
                .header("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJcImlzc3VlLXRyYWNrZXItdGVhbS0wNlwiIiwidXNlcklkIjoxfQ.WCMSnjyZCjZ80aSBN9GCNckS8Q_FkdpWXPWJwsx3kVA")
                .content(new ObjectMapper().writeValueAsString(labelDTO)))
                .andExpect(status().isOk());

        Label label = labelRepository.findById(4L).orElseThrow(LabelNotFoundException::new);
        softly.assertThat(label.getName()).isEqualTo(name);
        softly.assertThat(label.getColor().getBackgroundColorCode()).isEqualTo(color.getBackgroundColorCode());
        softly.assertThat(label.getColor().getTextColorCode()).isEqualTo(color.getTextColorCode());
        softly.assertThat(label.getDescription()).isEqualTo(description);
    }
}
